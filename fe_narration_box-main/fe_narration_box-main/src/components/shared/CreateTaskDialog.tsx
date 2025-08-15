'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { LucidePlus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useCreateTasks } from '@/api/hooks/todoQueries'
import { CreateTaskData } from '@/lib/types'
import { toast } from 'sonner'

const CreateTaskDialog = () => {
  const [title, setTitle] = useState('')
  const [description, setdescription] = useState('')
  const [time, setTime] = useState('')
  const creatTask = useCreateTasks()

  const handleCreate = async () => {
    const payload: CreateTaskData = {
      title: title,
      description: description,
      time_estimate: `${time}-${parseInt(time) + 1} days`
    }
    await creatTask.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("Saved!")
        setTitle("")
        setdescription("")
        setTime("")
      },
      onError: () => {
        toast.error(`Couldn't add...`)
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger>

        <LucidePlus size={40} />

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add a new task
          </DialogTitle>
        </DialogHeader>
        <div className='w-11/12 flex flex-col gap-3 mx-auto'>
          <Label htmlFor='title'>Title</Label>
          <Input id='title' placeholder='task title...' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full' />
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' placeholder='Task description...' value={description} onChange={(e) => setdescription(e.target.value)} className='w-full min-h-32' />
          <div className='flex items-center mx-auto gap-2'>
            <p>will take approx</p>
            <Input className='w-12 h-12' type='number' value={time} onChange={(e) => setTime(e.target.value)} />
            <p>days</p>
          </div>
          <Button onClick={handleCreate}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog
