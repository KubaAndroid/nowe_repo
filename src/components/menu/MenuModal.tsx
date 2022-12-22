import React from 'react'
import styles from "./MenuModal.module.css"

type ModalType = {
    openedModal: Function
}

function MenuModal({openedModal}: ModalType) {
  return (
      <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button onClick={() => openedModal(false)}> X </button>
                </div>
                <div className={styles.title}>
                    <h1>Title carbonara</h1>
                </div>
                <div className={styles.body}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className={styles.footer}>
                    <button onClick={() => openedModal(false)} id="cancelBtn">Cancel</button>
                    <button>Order</button>
                </div>
            </div>
    </div>
  )
}

export default MenuModal