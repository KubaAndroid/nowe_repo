import React, { FormEvent, MutableRefObject, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ContactForm.module.css';

class UserMessage {
  email?: string;
  message?: string;
}

function ContactForm() {
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const messageInputRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);
  const navigate = useNavigate();
  
  function submitHandler(event: FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value
    const enteredMessage = messageInputRef.current?.value
    const _userMessage: UserMessage = { email: enteredEmail, message: enteredMessage }
    console.log(_userMessage)
    postUserComment(_userMessage)
  }

  async function postUserComment(msg: UserMessage) {
    await fetch('http://localhost:5000/comments', {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      navigate('/', {replace: true})
    })
  }

  return (
      <form className={styles.card} onSubmit={ submitHandler }>
        <div className={styles.control}>
          <label htmlFor='email'>Your email address:</label>
          <input type='text' required id='email' placeholder='email@address' ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Message</label>
          <textarea id="message" required ref={messageInputRef} />
        </div>
        <div className={styles.actions}>
            <button>Send message</button>
        </div>
      </form>
  )
}

export default ContactForm