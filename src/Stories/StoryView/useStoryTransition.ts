import { useState, useEffect } from 'react'
import { TStory } from '../DATA'
import styles from './animation.module.scss'
import cn from 'classnames'

export const ANIMATION_DURATION = 1000

export function useStoryTransition(currentStory: TStory | undefined) {
  const [direction, setDirection] = useState<'next' | 'back' | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [displayedStory, setDisplayedStory] = useState(currentStory)
  const [nextStory, setNextStory] = useState<TStory | undefined>(undefined)

  useEffect(() => {
    if (currentStory !== displayedStory) {
      setNextStory(currentStory)
      setTransitioning(true)

      const timer = setTimeout(() => {
        setDisplayedStory(currentStory)
        setNextStory(undefined)
        setTransitioning(false)
        setDirection(null)
      }, ANIMATION_DURATION)

      return () => clearTimeout(timer)
    }
  }, [currentStory, displayedStory])

  const handleTransition = (newDirection: 'next' | 'back') => {
    if (transitioning) {
      return
    }

    setDirection(newDirection)
    setTransitioning(true)
  }

  const stylesRecord = styles as Record<string, string>

  const getAnimationClasses = (isCurrentStory: boolean) => {
    const classes = {
      [stylesRecord.shrink]: isCurrentStory && transitioning,
      [stylesRecord.slideOutToLeft]:
        isCurrentStory && transitioning && direction === 'next',
      [stylesRecord.slideOutToRight]:
        isCurrentStory && transitioning && direction === 'back',
      [stylesRecord.slideInFromRight]:
        !isCurrentStory && transitioning && direction === 'next',
      [stylesRecord.slideInFromLeft]:
        !isCurrentStory && transitioning && direction === 'back',
    }

    return cn(classes)
  }

  return {
    direction,
    transitioning,
    displayedStory,
    nextStory,
    handleTransition,
    getAnimationClasses,
  }
}
