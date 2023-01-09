import React from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import { useOrderContext } from '../../store/OrdersContext'
import styles from "./MenuModal.module.css"

type ModalType = {
    openedModal: Function
    menuItem: MenuItem | undefined
}

function MenuModal({ openedModal, menuItem }: ModalType) {
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
    } = useOrderContext()
    const quantity = getOrderItemQuantity(menuItem!.id)

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
                  <div className={styles.btnContainer}> 
                    {quantity === 0 ? (
                        <div >
                            <button onClick={() => increaseOrderItemQuantity(menuItem!.id)}>Buy</button>
                        </div>
                    ) : (
                        <div >
                            <button onClick={() => reduceOrderItemQuantity(menuItem!.id)}>-</button>
                            <button>{quantity}</button>
                            <button onClick={() => increaseOrderItemQuantity(menuItem!.id)}>+</button>
                        </div>
                    )}
                    
                  </div>
                </div>
            </div>
    </div>
  )
}

export default MenuModal