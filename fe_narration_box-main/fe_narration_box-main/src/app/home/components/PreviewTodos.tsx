import React from 'react'

import { Button } from '@/components/ui/button'
import TodoList from '@/components/shared/TodoList'
import Link from 'next/link'

const PreviewTodos = () => {
  return (
    <div className='w-full rounded-2xl flex flex-col pb-5 bg-darkAccent/40 backdrop-blur'>
      <div className='w-full rounded-t-2xl py-auto pl-[36px] h-[100px] relative flex items-center bg-darkAccent justify-between'>
        <div className='h-[36px] flex rounded-tr-2xl items-center justify-center py-auto bg-white w-[100px] -left-8  top-1/2 -translate-y-1/2 absolute my-auto -rotate-90'>
          color guide
        </div>
        <div className='px-3 flex items-center text-white justify-evenly w-full'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-green-400' />
            far
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-yellow-400' />
            near
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-orange-600' />
            due
          </div>
        </div>
      </div>

      <h1 className='text-2xl font-bold text-white py-4 w-full text-center'>
        Tasks at a glimpse
      </h1>
      <div className='text-white'>
        <TodoList number={6} />
      </div>
      <Link href={'/todos'} className='mx-auto'>
        <Button>
          View All
        </Button>
      </Link>
    </div>
  )
}

export default PreviewTodos
