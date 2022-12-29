import React from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import styles from "./MenuModal.module.css"

type ModalType = {
    openedModal: Function
    menuItem: MenuItem | undefined
}

function MenuModal({ openedModal, menuItem }: ModalType) {
    // TODO: add context and BUY! button
  return (
      <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button onClick={() => openedModal(false)}> X </button>
                </div>
                <div className={styles.title}>
                  <h1>{menuItem!.name}</h1>
                </div>
                <div className={styles.body}>
                    <p>{menuItem!.description}</p>
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