import React, { useState } from 'react'
import { UserOrder } from '../../model/UserOrderModel'
import styles from './OrdersListItem.module.css'

type OrderType = {
  order: UserOrder
}
function OrdersListItem({ order }: OrderType) {
  const [isExtended, setIsExtended] = useState<Boolean>(false)
  let user = order.user_id
  return (
    <div className={styles.orderListItem} onClick={() => setIsExtended(!isExtended)}>
      Date: {order.date} id: {order.menu_items} user: {user}
      {isExtended && <div>
        <p>div is extended</p>
      </div>}
    </div>
    
  )
}

export default OrdersListItem