import React, { useEffect, useState } from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import { UserModel } from '../../model/UserModel'
import { UserOrder } from '../../model/UserOrderModel'
import { useOrderContext } from '../../store/OrdersContext'
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
  priceTotal: number,
  quantity: number,
  price: number
}

function OrdersListItem({ order }: OrderType) {
  const [isExtended, setIsExtended] = useState<Boolean>(false)
  const {
    getMenuItemById,
    getClientById
  } = useOrderContext()

  const clientId: number = order.userId!
  const client: UserModel  = getClientById(clientId)!
  let sumTotal: number = 0
  const displayItemsArray: Map<number, SingleListItem>[] = []
  const boughtItems: MenuItem[] = []
  let itemsArray: SingleListItem[] = []

  const orderedItems = () => {
    let displayItem = new Map<number, SingleListItem>()
    order.menuItems?.forEach(itemId => {
      let menuItem = getMenuItemById(itemId)
      if (menuItem != null || menuItem !== undefined) {
        boughtItems.push(menuItem)
        let currentItem = displayItem.get(itemId)
        if (currentItem === null || currentItem === undefined) {
          displayItem.set(itemId, { name: menuItem?.name ?? "", priceTotal: menuItem?.price ?? 0, quantity: 1, price: menuItem.price })
        } else {
          currentItem.priceTotal += menuItem.price
          currentItem.quantity += 1
        }
      }
    })
    displayItemsArray.push(displayItem)
    sumTotal = boughtItems.reduce((sum, item) => {
      return sum + item.price;
    }, 0)

    displayItemsArray.forEach((item, k) => {
      item.forEach((v, k) => {
        let newItem = { name: "", quantity: 0, priceTotal: 0, price: 0 }
        newItem.name = v.name ?? ""
        newItem.quantity = v.quantity ?? 0
        newItem.priceTotal = v.priceTotal ?? 0
        newItem.price = v.price
        itemsArray.push(newItem)
      })
    })
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
          {itemsArray.map((item, index) => {
            return (
              <OrderListRow  key={index}>
                <div> {item.name}  x{item.quantity}</div>
                {/* ${item.price} */}
                <div>${item.priceTotal.toFixed(2)} </div>
              </OrderListRow>
            )
          })}
          
        </div>
        <br />
          <OrderListRow>
          <div>Sum total:</div>
            <div> <b>${sumTotal.toFixed(2)} </b></div>
            </OrderListRow>
      </div>}
      </OrderListItemLayout>
    
  )
}

export default OrdersListItem