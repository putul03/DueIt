'use client'
import GenerateTodoDialog from '@/components/shared/GenerateTodoDialog'
import GenerateTodoDisclaimer from '@/components/shared/GenerateTodoDisclaimer'
import LottieIcon from '@/components/shared/LottieEmoticon'
import React, { useEffect, useState } from 'react'

const GenerateTodoSection = () => {
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false)

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")
    if (hasVisitedBefore === 'true') {
      setHasVisitedBefore(true)
    } else {
      setHasVisitedBefore(false)
    }
  }, [])

  return (
    <div className='w-full bg-darkAccent/40 flex text-white pb-5 flex-col items-center justify-evenly rounded-2xl'>
      <div className='bg-accent flex items-center justify-center gap-2 copper-shine w-full py-4 text-2xl'>
        <p className='shine-text text-center font-extrabold'>
          AI Generate
        </p>
        <LottieIcon size={8} iconType='sparkle' />
      </div>
      <div className='w-full text-center px-5 flex flex-col'>
        Generate todos by describing your desired goal!
        {
          hasVisitedBefore ? (
            <GenerateTodoDialog />
          ) : (
            <GenerateTodoDisclaimer onReadDisclaimer={setHasVisitedBefore} />
          )
        }
      </div>
    </div>
  )
}

export default GenerateTodoSection
