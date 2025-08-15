import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { AnimationConfigWithData } from 'lottie-web'
import sparkleData from '../../../public/lottie/sparkles.json'
import Lottie from 'lottie-react'

interface LottieIconProps {
  iconType: 'sparkle';
  size?: number;
  loop?: boolean | number;
  className?: ClassNameValue;
}

type AnimationData = AnimationConfigWithData['animationData']

const iconMap: { type: string, animationData: AnimationData }[] = [
  { type: 'sparkle', animationData: sparkleData }
]

const LottieIcon = ({ iconType, size = 20, className, loop = true }: LottieIconProps) => {
  const currentIcon = iconMap.find(icon => icon.type === iconType.toLowerCase())

  return (
    <Lottie
      animationData={currentIcon?.animationData}
      loop={loop}
      style={{
        height: `${(size / 4)}rem`,
        width: `${(size / 4)}rem`
      }}
      className={`h-${size} w-${size} ${className}`}
    />
  )
}

export default LottieIcon
