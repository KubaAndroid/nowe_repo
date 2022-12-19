import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { MenuItem } from "../model/MenuItemModel"
import OrderContext from "../store/order-context"

const OrderPage = () => {
  const [orderedMenuItems, setOrderedMenuItems] = useState<MenuItem[]>();
  const ordersContext = useContext(OrderContext);
  useEffect(() => {
    setOrderedMenuItems(ordersContext.order)
  }, [])
  return (
    <div>
      {orderedMenuItems?.map((item) => {
        return <p key={item.id}>Dish: {item.name} Price: { item.price }</p>
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