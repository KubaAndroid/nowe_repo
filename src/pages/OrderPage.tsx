import { Link } from "react-router-dom";
import OrderItem from "../components/orders/OrderItem";
import { useOrderContext } from '../store/OrdersContext';
import styles from '../components/orders/OrderPage.module.css'


const OrderPage = () => {
  const { orderedItems } = useOrderContext()
  let sumTotal = orderedItems.reduce((sum, item) => {
    return sum + item.price;
  }, 0)

  return (
    <>
      <div className={styles.container}>
         { orderedItems.length < 1 && <div>Cart is empty</div>}
         {orderedItems?.map((item) => {
          return <OrderItem key={item.id} item={item} />
        })}

        <div className={styles.sumTotal}>Sum total: { sumTotal.toFixed(2)}</div>
        { orderedItems.length > 0 && <button className={styles.confirmButton}>
          <Link to='/orderConfirm'>Confirm</Link>
        </button>}
      
      </div>
      </>  
  )
}

export default OrderPage