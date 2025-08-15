import React from 'react'
import AppHeader from './components/AppHeader'
import AddTodoSection from './components/AddTodoSection'
import GenerateTodoSection from './components/GenerateTodoSection'
import PreviewTodos from './components/PreviewTodos'

const Home = () => {
  return (
    <div className='w-11/12 relative flex flex-col items-center gap-3 max-w-[640px] sm:max-w-[340px] mx-auto'>
      <AppHeader />
      <AddTodoSection />
      <GenerateTodoSection />
      <PreviewTodos />
    </div>
  )
}

export default Home
