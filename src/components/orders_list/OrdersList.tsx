import React, { useEffect, useState } from 'react'
import { UserOrder } from '../../model/UserOrderModel'
import { useOrderContext } from '../../store/OrdersContext'
import styles from './OrdersList.module.css'
import OrdersListItem from './OrdersListItem'

function OrdersList() {

  const { getAllOrders, ordersList, setOrdersList } = useOrderContext()
  
  // const [ordersList, setOrdersList] = useState<UserOrder[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    const getMenuItems = async () => {
      const fetchedOrders = await getAllOrders()
      // setOrdersList(fetchedOrders)
      console.log(fetchedOrders)
      setIsLoading(false)
    }
    getMenuItems()
  }, [])
  
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