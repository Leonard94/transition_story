import { Stories } from './Stories/Stories'
import './styles.scss'

export const App = () => {
  return (
    <div className='app'>
      <div className='container'>
        <Stories />
      </div>
    </div>
  )
}
