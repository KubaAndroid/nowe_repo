import React, { useEffect, useState } from 'react'
import { UserOrder } from '../../model/UserOrderModel'
import styles from './OrdersList.module.css'

function OrdersList() {
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
      <div className={styles.container}>
        Loading...
      </div>
    ) : (
      <div className={styles.container}>
          {ordersList.map((order) => {
            return <div>Date: {order.date} user: { order.user_id }</div>
          })}
      </div>
    )
  )
}

export default OrdersList