import React from 'react'
import { TStory } from '../DATA'
import styles from './styles.module.scss'
import cn from 'classnames'
import { useStoryTransition } from './useStoryTransition'

type TProps = {
  currentStory: TStory | undefined
  handleBackStory: () => void
  handleNextStory: () => void
  handleCloseView: () => void
}

export const StoryView: React.FC<TProps> = ({
  currentStory,
  handleBackStory,
  handleNextStory,
  handleCloseView,
}) => {
  const {
    transitioning,
    displayedStory,
    nextStory,
    handleTransition,
    getAnimationClasses
  } = useStoryTransition(currentStory)

  const handleNext = () => {
    handleTransition('next')
    handleNextStory()
  }

  const handleBack = () => {
    handleTransition('back')
    handleBackStory()
  }

  if (!displayedStory) {
    return null
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.back}
        onClick={handleBack}
        disabled={transitioning}
      >
        back
      </button>
      <div className={styles.view}>
        <div className={styles.view__container}>
          <img
            src={displayedStory.img}
            alt={String(displayedStory.id)}
            className={cn(styles.image, styles.currentImage, getAnimationClasses(true))}
          />
          {nextStory && (
            <img
              src={nextStory.img}
              alt={String(nextStory.id)}
              className={cn(styles.image, styles.nextImage, getAnimationClasses(false))}
            />
          )}
        </div>
        <div className={styles.close} onClick={handleCloseView}>
          close
        </div>
      </div>
      <button
        className={styles.next}
        onClick={handleNext}
        disabled={transitioning}
      >
        next
      </button>
    </div>
  )
}