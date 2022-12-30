import { Link } from "react-router-dom";
import OrderItem from "../components/orders/OrderItem";
import { useOrderContext } from '../store/OrdersContext';
import styles from '../components/orders/OrderPage.module.css'


const OrderPage = () => {
  const { orderedItems } = useOrderContext()

  return (
    <div className={styles.container}>
      {orderedItems?.map((item) => {
        return <OrderItem key={item.id} item={item} />
      })}

      
        <button className={styles.confirmButton}>
          <Link to='/orderConfirm'>Confirm</Link>
        </button>
      
    </div>
  )
}

export default OrderPage