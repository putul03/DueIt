import React from 'react'
import Todos from './components/todos'

const Page = () => {
  return (
    <div className='px-5 pt-5 '>
      <h1 className='text-3xl font-extrabold text-white w-full text-center'>
        All todos
      </h1>
      <Todos />
    </div>
  )
}

export default Page
