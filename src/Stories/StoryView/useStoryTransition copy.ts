import { useState, useEffect } from 'react'
import { TStory } from '../DATA'

export const ANIMATION_DURATION = 1000

export const useStoryTransition = (currentStory: TStory | undefined) => {
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

  return {
    direction,
    transitioning,
    displayedStory,
    nextStory,
    handleTransition,
  }
}
