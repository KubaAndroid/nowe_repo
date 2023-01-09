import React, { useEffect, useState } from 'react'
import { UserOrder } from '../../model/UserOrderModel'
import { useOrderContext } from '../../store/OrdersContext'
import styles from './OrdersList.module.css'
import OrdersListItem from './OrdersListItem'

function OrdersList() {

  const { getAllOrders } = useOrderContext()
  
  const [ordersList, setOrdersList] = useState<UserOrder[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    const getMenuItems = async () => {
      const fetchedOrders = await getAllOrders()
      setOrdersList(fetchedOrders)
      console.log(ordersList)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])

  // TODO: get orders from context

  // useEffect(() => {
  //   const allOrders = async () => {
  //     const fetchedOrdersList = await getAllOrders()
  //     setOrdersList(fetchedOrdersList)
  //     console.log(ordersList)
  //     setIsLoading(false)
  //   }
  //   allOrders()
  // })

  
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