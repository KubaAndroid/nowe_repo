import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <hr style={{width: "80%"}}></hr>
      <div>
        <p>Copyright &copy; 2022</p>
        <p><Link to='/contact'>Contact</Link></p>
      </div>
    </footer>
  )
}

export default Footer