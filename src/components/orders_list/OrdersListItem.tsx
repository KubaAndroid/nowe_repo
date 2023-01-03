import React, { useState } from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import { UserModel } from '../../model/UserModel'
import { UserOrder } from '../../model/UserOrderModel'
import { useOrderContext } from '../../store/OrdersContext'
import styles from './OrdersListItem.module.css'

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
  
  const boughtItems: MenuItem[] = []
  const orderedItems = () => {
    console.log(client)
    order.menuItems?.forEach(itemId => {
      let menuItem = getMenuItemById(itemId)
      if (menuItem != null || menuItem !== undefined) {
        boughtItems.push(menuItem)
      }
    })
    return boughtItems
  }

  orderedItems()

  return (
    <div className={styles.orderListItem} onClick={() => setIsExtended(!isExtended)}>
      <b>Date: {order.date} id: {order.id} </b>
      {isExtended && <div>
        <div> {client?.firstName} {client?.lastName} </div>
        <div>{client?.addressStreet} {client?.addressNumber}, {client?.addressZipCode}  {client?.addressCity} </div>
        <div>basket:
        {boughtItems.map(item => {
          return (
            <div> {item.name}</div>
          )
        })
          }
          </div>
        
        {/* {order.menuItems?.map((item) => {
          return (
            <p>{item}</p>
          )
        })} */}
      </div>}
    </div>
    
  )
}

export default OrdersListItem