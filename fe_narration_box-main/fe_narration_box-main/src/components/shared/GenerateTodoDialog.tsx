'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GenerateTaskData, userChoices } from '@/lib/types'
import { useGenerateTasks } from '@/api/hooks/todoQueries'
import { toast } from 'sonner'


const todoLevels: userChoices[] = ['alpha', 'beta', 'sigma']



const GenerateTodoDialog = () => {
  const [userPrompt, setuserPrompt] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [userLevelChoice, setUserLevelChoice] = useState<userChoices | ''>('')
  const genTasks = useGenerateTasks()


  useEffect(() => {
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus()
      }
    }, 200)
  })

  const eventHandler = {
    "user-prompt": (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
      setuserPrompt(e.target.value)
    },
    "generate-tasks": async () => {
      if (userLevelChoice === '') {
        toast.error('You must select a level')
        return
      }

      // simulate API call using tanstack query
      const returnLevel = (levelStr: userChoices) => {
        switch (levelStr) {
          case 'alpha':
            return 1;
          case 'beta':
            return 2;
          case 'sigma':
            return 3;
        }
      }

      const payload: GenerateTaskData = {
        prompt: userPrompt,
        level: returnLevel(userLevelChoice)
      }

      await genTasks.mutateAsync(payload)
    },

  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Let&apos;s go!
        </Button>
      </DialogTrigger>
      <DialogContent>

        <DialogDescription>
          <DialogHeader>
            <DialogTitle>
              Describe your objective
            </DialogTitle>
          </DialogHeader>
        </DialogDescription>
        <div className='flex py-5 px-3 flex-col gap-3 items-center justify-evenly'>
          <Textarea value={userPrompt} className='min-h-28' onChange={eventHandler["user-prompt"]} ref={textAreaRef} placeholder='I wanna set up a food truck to sell organic indian street food...' />
          <Select value={userLevelChoice} defaultValue='' onValueChange={(value: userChoices) => setUserLevelChoice(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Levels</SelectLabel>
                {
                  todoLevels.map(level => (
                    <SelectItem value={level} key={level} id={level}>{level}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={eventHandler["generate-tasks"]}>
            Generate todos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GenerateTodoDialog
