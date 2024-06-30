import { useState } from 'react'
import { PreviewStories } from './PreviewStories/PreviewStories'
import { StoryView } from './StoryView/StoryView'
import { DATA } from './DATA'

export const Stories = () => {
  const [currentStoryId, setCurrentStoryId] = useState<null | number>(null)

  const handleSetStory = (id: number) => {
    setCurrentStoryId(id)
  }

  const handleNextStory = () => {
    const currentIndexElement = DATA.findIndex(
      (item) => item.id === currentStoryId
    )

    const newEl = DATA[currentIndexElement + 1]?.id

    if (newEl) {
      return setCurrentStoryId(newEl)
    }
    setCurrentStoryId(null)
  }

  const handleBackStory = () => {
    const currentIndexElement = DATA.findIndex(
      (item) => item.id === currentStoryId
    )

    const newEl = DATA[currentIndexElement - 1]?.id

    if (newEl) {
      return setCurrentStoryId(newEl)
    }
    setCurrentStoryId(null)
  }

  const handleCloseView = () => {
    setCurrentStoryId(null)
  }

  const getStory = DATA.find((story) => story.id === currentStoryId)

  return (
    <div>
      <div>Stories</div>
      <PreviewStories data={DATA} handleClickStory={handleSetStory} />
      {currentStoryId && (
        <StoryView
          currentStory={getStory}
          handleNextStory={handleNextStory}
          handleBackStory={handleBackStory}
          handleCloseView={handleCloseView}
        />
      )}
    </div>
  )
}
