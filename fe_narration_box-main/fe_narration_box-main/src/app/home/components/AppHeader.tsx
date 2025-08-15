'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'

const AppHeader = () => {
  const todo_animation_variant: Variants = {
    initial: {
      scale: 0,
      display: 'none'
    },
    animate: {
      scale: 1,
      display: 'inline',
      transition: {
        duration: 150,
        delay: 0.5,
        type: 'tween'
      }
    }
  }


  return (
    <div className='font-extrabold text-white flex gap-5 flex-col items-center justify-center text-xl text-center'>
      <motion.span variants={todo_animation_variant} className='dark mt-5 text-3xl mx-1  w-min p-1 inline'>
        <p className='shine-text'>DueIt.ai</p>
      </motion.span>
      <div className='text-darkAccent text-base text-justify w-full'>
        We don&apos;t do hard deadlines here, let&apos;s cut down on anxiety and work for a healthier mind too. For this reason, we don&apos;t believe in edits, don&apos;t edit you task, do it! or delete it and start afresh. Redoing and changing, giving yourself more and more time are old habits, welcome to DueIt! Change begins with you.
      </div>
    </div>
  )
}

export default AppHeader
