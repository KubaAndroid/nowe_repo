import React, { useState } from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import { UserModel } from '../../model/UserModel'
import { UserOrder } from '../../model/UserOrderModel'
import { useOrderContext } from '../../store/OrdersContext'
import styles from './OrdersListItem.module.css'
import styled from "styled-components";

const OrderListItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid #e0d7c9;
  border-radius: 14px;
  margin: 10px;
`

type OrderType = {
  order: UserOrder
}

function OrdersListItem({ order }: OrderType) {
  const [isExtended, setIsExtended] = useState<Boolean>(false)
  const {
    getMenuItemById,
    getClientById
  } = useOrderContext()

  const clientId = order.userId!
  const client = getClientById(clientId)
  let sumTotal: number = 0
  
  const boughtItems: MenuItem[] = []
  const orderedItems = () => {
    order.menuItems?.forEach(itemId => {
      let menuItem = getMenuItemById(itemId)
      if (menuItem != null || menuItem !== undefined) {
        boughtItems.push(menuItem)
      }
    })
    sumTotal = boughtItems.reduce((sum, item) => {
    return sum + item.price;
  }, 0)
    return boughtItems
  }

  orderedItems()

  

  return (
    // <div className={styles.orderListItem} onClick={() => setIsExtended(!isExtended)} key={order.id}>
      <OrderListItemLayout>
      <div className={styles.orderListRow}>
        <div>Order {order.id}</div> Date: {order.date}
      </div>
      {isExtended && <div>
        <div> {client?.firstName} {client?.lastName} </div>
        <div>{client?.addressStreet} {client?.addressNumber}, {client?.addressZipCode}  {client?.addressCity} </div>
        <div><br />
          {boughtItems.map((item, index) => {
            return (
              <div className={styles.orderListRow}>
                <div key={index}> {item.name}</div><div> {item.price.toFixed(2)} </div>
              </div>
            )
          })}
        </div>
        <br />
        <div className={styles.orderListRow}>
          <div>Sum total:</div>
          <div> <b>{sumTotal.toFixed(2)} </b></div>
        </div>
      </div>}
      </OrderListItemLayout>
    // </div>
    
  )
}

export default OrdersListItem