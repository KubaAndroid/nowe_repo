import React, { useEffect, useState } from 'react'
import { UserOrder } from '../../model/UserOrderModel'
import { useOrderContext } from '../../store/OrdersContext'
import styles from './OrdersList.module.css'
import OrdersListItem from './OrdersListItem'

function OrdersList() {

  const { getAllMenuItems, allMenuItems, filteredMenuItems } = useOrderContext()
  
  const [ordersList, setOrdersList] = useState<UserOrder[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    const getMenuItems = async () => {
      const fetchedOrders = await fetchOrders()
      setOrdersList(fetchedOrders)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])

  async function fetchOrders() {
    const res = await fetch('http://localhost:5000/orders')
    const data = await res.json()
    return data
  }

  
  return (
    isLoading ? (
      <div>
        Loading...
      </div>
    ) : (
      <div className={styles.container}>
          {ordersList.map((order, index) => {
            return <OrdersListItem key={index} order={order} />
          })}
      </div>
    )
  )
}

export default OrdersList