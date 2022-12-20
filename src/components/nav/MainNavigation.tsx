import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './MainNavigation.module.css'
import pyra from '../../img/potato_logo.png';
// import OrderContext from '../../store/order-context';
import { useOrderContext } from '../../store/OrdersContext';

const MainNavigation = () => {
  // const orderContext = useContext(OrderContext)
  const {
    orderQuantity
  } = useOrderContext()

    return (
        <header className={styles.header}>
          <div>
              <img src={pyra} width="100" height="100" alt='logo'/>
          </div>
          <div>Bar Pyra</div>
          <div>
              <nav>
                  <ul>
                    <li><Link to='/'>Menu</Link></li>
              <li><Link to='/order'>
                Order
                <span className={styles.badge}>{orderQuantity}</span>
              </Link></li>
                    <li><Link to='/orderslist'>Orders List</Link></li>
                  </ul>
              </nav>
          </div>
    </header>
  )
}

export default MainNavigation

