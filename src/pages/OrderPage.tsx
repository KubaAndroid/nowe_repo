import { Link } from "react-router-dom";
import OrderItem from "../components/orders/OrderItem";
import { useOrderContext } from '../store/OrdersContext';
import styles from '../components/orders/OrderItem.module.css'


const OrderPage = () => {
  const { orderedItems } = useOrderContext()

  return (
    <div>
      {orderedItems?.map((item) => {
        return <OrderItem key={item.id} item={item} />
      })}

      <p>
        <button className={styles.confirmButton}>
          <Link to='/orderConfirm'>Confirm</Link>
        </button>
      </p>
    </div>
  )
}

export default OrderPage