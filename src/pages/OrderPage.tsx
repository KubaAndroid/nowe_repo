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
        {orderedItems.length < 1 && <div className={ styles.cartEmpty}>Cart is empty</div>}
         {orderedItems?.map((item) => {
          return <OrderItem key={item.id} item={item} />
        })}
        {orderedItems.length > 0 && <>
          <div className={styles.sumTotal}>Sum total: {sumTotal.toFixed(2)}</div>
          <div className={styles.confirmOrder}>
            <Link to='/orderConfirm'><button className={styles.confirmButton}>Confirm</button></Link>
            </div>
        </>}
      </div>
      </>  
  )
}

export default OrderPage