import { LucideFilter, LucideSearch } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import debounce from "lodash.debounce"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { availableFilters, availableSortTypes } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { PopoverClose } from '@radix-ui/react-popover';

const allFilters: availableFilters[] = ['complete', 'incomplete', 'due now']
const allSortTypes: { value: availableSortTypes, label: string }[] = [
  { value: 'big-first', label: "Big tasks first" },
  { value: 'small-first', label: "Small tasks first" }
]

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<availableFilters[]>>;
  setSortType: Dispatch<SetStateAction<availableSortTypes | ''>>;
  filters: availableFilters[];
  sortType: availableSortTypes | '';
}

const SearchBar = ({ setSearchQuery, setFilters, setSortType, sortType }: SearchBarProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<availableFilters, boolean>>({
    'complete': false,
    'incomplete': false,
    'due now': false
  })
  const [selectedSort, setSelectedSort] = useState<availableSortTypes | ''>('')
  const [localSearchQuery, setLocalSearchQuery] = useState('')

  const debouncedQuery = useMemo(
    () =>
      debounce((query) => {
        setSearchQuery(query);
      }, 200),
    [setSearchQuery]
  );

  useEffect(() => {
    debouncedQuery(localSearchQuery)
    return () => {
      debouncedQuery.cancel()
    }
  }, [localSearchQuery, debouncedQuery])


  return (
    <div className='w-full flex relative items-center'>
      <LucideSearch className='absolute text-white left-0 top-1/2 p-2 -translate-y-1/2 h-10 w-10' />
      <Input className='w-full placeholder-slate-100 placeholder ml-11' onChange={(e) => setLocalSearchQuery(e.target.value)} value={localSearchQuery} placeholder='search task title or description' />
      <Popover>
        <PopoverTrigger asChild>
          <div className='p-4 text-white'><LucideFilter /></div>
        </PopoverTrigger>
        <PopoverContent className="w-44 bg-tertiary text-white right-1/2  absolute">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <div className="grid gap-2">
                <div className="grid grid-rows-3 items-center gap-4">
                  {
                    allFilters.map(filter => {
                      return (
                        <div key={filter} className='flex gap-2 items-center justify-start'>
                          <Checkbox
                            checked={activeFilters[filter]}
                            onClick={() => {
                              setActiveFilters(prev => ({ ...prev, [filter]: !prev[filter] }))
                            }}
                            id={filter}
                          />
                          <label
                            htmlFor={filter}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      )
                    }
                    )
                  }
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Sort by</h4>
              <div className="flex flex-col gap-2">
                <Select defaultValue={sortType} value={selectedSort} onValueChange={(value: availableSortTypes) => {
                  setSelectedSort(value)
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder={sortType || `choose`} />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      allSortTypes.map(sort => {
                        return (
                          <SelectItem
                            key={sort.value}
                            value={sort.value}>
                            {sort.label}
                          </SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
            <PopoverClose>
              <Button onClick={() => {
                const filtertosend: availableFilters[] = Object.entries(activeFilters).filter(([key, val]) => {
                  if (val === true) return key.toString()
                }).map(([key]) => key as availableFilters)
                setFilters(filtertosend)
                setSortType(selectedSort)
              }}>
                Save
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>

      </Popover>
    </div >
  )
}

export default SearchBar
