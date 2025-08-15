'use client'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../ui/button'
import { LucideCheckSquare, LucideTrash } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { availableFilters, availableSortTypes, Todotype } from '@/lib/types'
import SearchBar from './SearchBar'
import { useDeleteTask, useGetTasks, useMarkAsComplete } from '@/api/hooks/todoQueries'


function truncateText({ text, length = 30 }: { text: string, length?: number }) {
  if (text.length <= length) {
    return text
  } else {
    return `${text.slice(0, length)}...`
  }
}

function getDaysRemaining(created_time: string | Date, time_estimate: string) {
  const today = new Date()
  const nDay = time_estimate.split(" ")[0].split("-")[1]
  const target = new Date(created_time)
  target.setDate(target.getDate() + parseInt(nDay))
  const diffInDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return diffInDays
}

function returnDeadlineColorComponent(created_time: string | Date, time_estimate: string): React.ReactNode {
  const diffInDays = getDaysRemaining(created_time, time_estimate)
  if (diffInDays <= 2) {
    return <div className='w-12 h-8 mr-3 bg-orange-600' />
  } else if (diffInDays > 2 && diffInDays <= 4) {
    return <div className='w-12 h-8 mr-3 bg-yellow-400' />
  } else if (diffInDays > 4) {
    return <div className='w-12 h-8 mr-3 bg-green-400' />
  }

}

const TodoList = ({ number, className }: { number?: number, className?: ClassNameValue, searchBar?: boolean }) => {
  const { data: items, isLoading } = useGetTasks()
  const deleteTask = useDeleteTask()
  const markAsComplete = useMarkAsComplete()
  const [userQuery, setUserQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortType, setSortType] = useState<availableSortTypes | ''>('')
  const [filters, setFilters] = useState<availableFilters[]>([])
  const [filteredItems, setFilteredItems] = useState<Todotype>([])

  useEffect(() => {
    if (items && items.length > 0) {
      const sorted = items?.sort((a, b) => {
        if (!a.completed && b.completed) return -1
        if (a.completed && !b.completed) return 1

        const daysTillA = getDaysRemaining(a.created_at, a.time_estimate)
        const daysTillB = getDaysRemaining(b.created_at, b.time_estimate)
        return daysTillA - daysTillB
      });
      setFilteredItems(sorted)
    }
  }, [items])

  useEffect(() => {
    if (items && !isLoading) {
      const filtertask = items?.filter(item => {
        if (item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) || item.description.toLowerCase().includes(debouncedQuery.toLowerCase())) {
          return item
        }
      })
      setFilteredItems(filtertask as Todotype)
    }
  }, [debouncedQuery, items, isLoading])

  useEffect(() => {
    if (items && !isLoading) {
      setUserQuery("")
      const itemssort = items.filter(item => {
        if (filters.length > 0) {
          for (const filter of filters) {
            switch (filter) {
              case 'complete':
                if (item.completed) {
                  return item
                }
                break
              case 'incomplete':
                if (!item.completed) {
                  return item
                }
                break
              case 'due now':
                const ran = Math.random()
                if (ran < 0.2) {
                  return item
                }
                break
            }
          }
        } else {
          return item
        }
      })

      if (sortType) {
        switch (sortType) {
          case 'big-first':
            setFilteredItems(itemssort.sort((a, b) => {
              const Atime = a.time_estimate.split(" ")[0].split("-").reduce((acc, curr) => acc += parseInt(curr), 0)
              const Btime = b.time_estimate.split(" ")[0].split("-").reduce((acc, curr) => acc += parseInt(curr), 0)
              return Btime - Atime
            }))
            break;
          case 'small-first':
            setFilteredItems(itemssort.sort((a, b) => {
              const Atime = a.time_estimate.split(" ")[0].split("-").reduce((acc, curr) => acc += parseInt(curr), 0)
              const Btime = b.time_estimate.split(" ")[0].split("-").reduce((acc, curr) => acc += parseInt(curr), 0)
              return Atime - Btime
            }))
            break;
        }
      } else {
        setFilteredItems(itemssort)
      }

    }
  }, [filters, sortType, items, isLoading])

  if (isLoading) return <p className='text-white'>Hold on...</p>

  const handleComplete = async (id: string) => {
    await markAsComplete.mutateAsync(id)
  }

  const handleDelete = async (id: string) => {
    await deleteTask.mutateAsync(id)
  }

  return (
    <div className='w-full flex flex-col items-center justify-start'>
      <SearchBar searchQuery={userQuery} setSearchQuery={setDebouncedQuery} sortType={sortType} filters={filters} setFilters={setFilters} setSortType={setSortType} />
      <Accordion type="single" collapsible className={cn(className, "pr-5 w-full")}>
        {
          (number ? filteredItems.slice(0, number) : filteredItems).map(todo => (
            <AccordionItem key={todo.id} value={todo.id}>
              <AccordionTrigger className={cn(todo.completed && 'line-through', 'text-base text-left')}>
                {
                  returnDeadlineColorComponent(todo.created_at, todo.time_estimate)
                }
                {
                  truncateText({ text: todo.title })
                }
              </AccordionTrigger>
              <AccordionContent className='w-full text-base flex flex-col items-start pl-5 justify-between gap-3'>
                <div className='flex items-start justify-between w-full'>
                  <div>{
                    todo.description
                  }
                  </div>
                  <div className='text-sm'>
                    {
                      `${(new Date(todo.created_at)).getDay()}/${(new Date(todo.created_at)).getMonth() + 1}/${(new Date(todo.created_at)).getFullYear()}`
                    }
                  </div>
                </div>
                <div className='font-bold underline'>
                  Initial Estimate - {todo.time_estimate}
                </div>
                <div className='font-bold underline'>
                  {todo.completed ? 'Completed' : "Not complete"}
                </div>

                <div className='w-full flex items-center justify-between gap-2'>
                  {
                    !todo.completed && (
                      <Button size={'sm'} className='block bg-green-500' onClick={() => handleComplete(todo.id)}>
                        <LucideCheckSquare className='inline' /> Done
                      </Button>
                    )}

                  <Button size={'sm'} className='block bg-red-500' onClick={() => handleDelete(todo.id)}>
                    <LucideTrash className='inline' /> Delete
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>

    </div>
  )
}

export default TodoList
