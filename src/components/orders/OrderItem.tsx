import React from 'react'
import { OrderCartItem } from '../../model/OrderCardItemModel';
import { useOrderContext } from '../../store/OrdersContext';
import styles from './OrderItem.module.css'
import trash from '../../assets/img/trash-can.png'

type OrderType = {
  item: OrderCartItem;
}

function OrderItem({ item }: OrderType) {
  const { increaseOrderItemQuantity,reduceOrderItemQuantity, removeOrderItem } = useOrderContext()

  return (
    <>
      <div className={styles.orderItem}>
        <div className={styles.top}>
          <div>
            <p className={ styles.name}>{item.name}</p>
            <p className={ styles.quantity}>Quantity: {item.quantity}</p>
            <p className={ styles.quantity}> Price total: {item.price} </p>
          </div>
          <div>
          <p>
          <button className={styles.actionsButton} onClick={() => reduceOrderItemQuantity(item.id!)}>-</button>
          <p className={styles.actionsButton}>{item.quantity}</p>
          <button className={styles.actionsButton} onClick={() => increaseOrderItemQuantity(item.id!)} >+</button>
        </p>
            <img src={trash} alt="" style={{ height: "40px" }} onClick={() => removeOrderItem(item.id!)} />
            </div>
          </div>
      </div>
    </>
  )
}

export default OrderItem