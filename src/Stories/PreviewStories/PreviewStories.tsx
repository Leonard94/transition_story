import styles from './styles.module.scss'
import { TStory } from '../DATA'

type TProps = {
  data: TStory[]
  handleClickStory: (id: number) => void
}

export const PreviewStories: React.FC<TProps> = ({
  data,
  handleClickStory,
}) => {
  return (
    <div className={styles.preview}>
      {data.map((item) => (
        <div
          key={item.id}
          className={styles.item}
          onClick={() => handleClickStory(item.id)}
        >
          <img src={item.img} alt={String(item.id)} />
        </div>
      ))}
    </div>
  )
}
