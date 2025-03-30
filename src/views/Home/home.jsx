import styles from '../../styles/home.module.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <>
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
      <p className={styles.text}>
        Primera vez que entras? <Link to="/Register">Regístrate</Link>
      </p>
    </div>
   </>
  )
}

export default Home
