import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <hr style={{width: "80%"}}></hr>
      <div className={styles.topLinks}>
        <p><Link to='/contact'>Contact</Link></p>
        <p><Link to='/contact'>About us</Link></p>
        <p><Link to='/contact'>Terms & Conditions</Link></p>
        <p><Link to='/contact'>Privacy policy</Link></p>
        <p><Link to='/contact'>Cookies policy</Link></p>
      </div>
      <p>Copyright &copy; 2022</p>
    </footer>
  )
}

export default Footer