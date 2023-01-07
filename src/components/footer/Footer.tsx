import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook, faSnapchat } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <hr style={{width: "80%", color: 'white', margin: '22px'}}></hr>
      <div className={styles.topLinks}>
        <p><Link to='/contact'>Contact</Link></p>
        <p><Link to='/contact'>About us</Link></p>
        <p><Link to='/contact'>Terms & Conditions</Link></p>
        <p><Link to='/contact'>Privacy policy</Link></p>
        <p><Link to='/contact'>Cookies policy</Link></p>
      </div>

      <div className={styles.topLinksIcons}>
        <p><FontAwesomeIcon icon={ faTwitter } style={{height: '50px'}}></FontAwesomeIcon></p>
        <p><FontAwesomeIcon icon={ faInstagram } style={{height: '50px'}}></FontAwesomeIcon></p>
        <div><FontAwesomeIcon icon={ faFacebook } style={{height: '50px'}}></FontAwesomeIcon></div>
        <FontAwesomeIcon icon={ faSnapchat } style={{height: '50px'}}></FontAwesomeIcon>
      </div>

      <p>Copyright &copy; 2023</p>
    </footer>
  )
}

export default Footer