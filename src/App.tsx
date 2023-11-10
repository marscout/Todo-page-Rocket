import './global.css'

import styles from './App.module.css'
import { FormTodo } from './components/FormTodo'
import { RocketLaunch } from 'phosphor-react'

function App() {

  return (
    <>
      <header>
        <RocketLaunch size={40} color="#5E60CE" weight="fill" />
        <div>
          <span className={styles.to}>
            to
          </span>
          <span className={styles.do}>
            do
          </span>
        </div>
      </header>
      <main>
        <div className={styles.content}>
            <FormTodo />
        </div>
      </main>
    </>
  )
}

export default App
