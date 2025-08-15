'use client'
import React from 'react'
import TaskCharts from './components/Charts'
import { useGetTasks } from '@/api/hooks/todoQueries'

const Page = () => {
  const { data: items, isLoading } = useGetTasks()

  return (
    <div className='pb-[150px]'>
      <h1 className='text-4xl font-bold w-full text-center py-3'>Your analysis</h1>
      {
        (!items && isLoading) && (
          <div>Hang on...</div>
        )
      }
      {
        items && (
          <TaskCharts tasks={items} />
        )
      }
    </div>
  )
}

export default Page
