import styles from '../../styles/home.module.css'
import Link from 'next/link'

function Home() {
  return (
   <>
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
      <p className={styles.text}>Primera vez que entras? <Link href="/register"><a>Regístrate</a></Link></p>
    </div>
   </>
  )
}

export default Home
