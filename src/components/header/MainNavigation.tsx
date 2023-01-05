import { Link } from 'react-router-dom'
import styles from './MainNavigation.module.css'
import pyra from '../../assets/img/potato_logo.png';
import { useOrderContext } from '../../store/OrdersContext';

const MainNavigation = () => {
  const { orderQuantity } = useOrderContext()

    return (
        <header className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src={pyra} width="100" height="100" alt='logo' />
          </Link>
        </div>
        <div className={ styles.pyra}>Bar Pyra</div>
        <div className={styles.navigation}>
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

