import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { MenuItem } from "../model/MenuItemModel"
// import OrderContext from "../store/order-context"
import { useOrderContext, OrderCartItem } from '../store/OrdersContext';


const OrderPage = () => {
  const { orderedMenuItems, orderedItems } = useOrderContext()

  return (
    <div>
      {orderedItems?.map((item) => {
        return <div key={item.id}>
          <p>Dish: {item.name} </p>
          <p>Quantity: {item.quantity}</p>
          <p> Price total: {item.price} </p>
        </div>
      })}
      <p>
        <button>
          <Link to='/orderConfirm'>Confirm</Link>
        </button>
      </p>
    </div>
  )
}

export default OrderPage