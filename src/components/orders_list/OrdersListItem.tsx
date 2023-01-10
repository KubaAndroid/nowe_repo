import React, { useEffect, useState } from 'react'
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
  &:hover { 
    background-color: #e9e6e2;
    cursor: pointer;
  }
`

const OrderListRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`

type OrderType = {
  order: UserOrder
}

type SingleListItem = {
  name: string,
  price: number,
  quantity: number
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

  // let displayItem = new Map<number, SingleListItem>()
  let displayItemsArray: Map<number, SingleListItem>[] = []

  const boughtItems: MenuItem[] = []
  // TODO: GROUP ITEMS WITH SAME ID - NAME, COUNT, PRICE, SUM = PRICE X COUNT
  // TODO: display grouped items: ITEM_1 x3 ...... $33.33
  const orderedItems = () => {
    let displayItem = new Map<number, SingleListItem>()
    order.menuItems?.forEach(itemId => {
      
      let menuItem = getMenuItemById(itemId)

      if (menuItem != null || menuItem !== undefined) {
        boughtItems.push(menuItem)
        let currentItem = displayItem.get(itemId)

        if (currentItem === null || currentItem === undefined) {
          displayItem.set(itemId, { name: menuItem?.name ?? "", price: menuItem?.price ?? 0, quantity: 1 })

        } else {
          currentItem.price += menuItem.price
          currentItem.quantity += 1
        }
        
      }
    })
    displayItemsArray.push(displayItem)
    console.log(displayItem)
    sumTotal = boughtItems.reduce((sum, item) => {
      return sum + item.price;
    }, 0)
    console.log(displayItemsArray)
    return boughtItems
  }

  orderedItems()

  return (
    <OrderListItemLayout onClick={() => setIsExtended(!isExtended)}  key={order.id}>
      <OrderListRow>
        <div>Order {order.id}</div> Date: {order.date}
        </OrderListRow>
      
      {isExtended && <div>
        <div> {client?.firstName} {client?.lastName} </div>
        <div>{client?.addressStreet} {client?.addressNumber}, {client?.addressZipCode}  {client?.addressCity} </div>
        <div><br />
          
          {/* {displayItems.entries().map((item, index) => {
            return (
                <OrderListRow>
                <div key={index}> {item.name}</div><div> {item.price.toFixed(2)} </div>
              </OrderListRow>
            )
          })} */}

          {boughtItems.map((item, index) => {
            return (
                <OrderListRow>
                <div key={index}> {item.name}</div><div> {item.price.toFixed(2)} </div>
              </OrderListRow>
            )
          })}
        </div>
        <br />
          <OrderListRow>
          <div>Sum total:</div>
            <div> <b>{sumTotal.toFixed(2)} </b></div>
            </OrderListRow>
      </div>}
      </OrderListItemLayout>
    
  )
}

export default OrdersListItem