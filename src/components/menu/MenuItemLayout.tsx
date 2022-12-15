import React, {useContext} from 'react'
import { MenuItem } from '../../model/MenuItem'
import styles from './MenuItemLayout.module.css';
import pickl from '../../img/pickls.png';
import MenuCard from './MenuCard';
import OrderContext from '../../store/order-context';

interface MenuItemType {
    menuItem: MenuItem
}

function MenuItemLayout({ menuItem }: MenuItemType) {
    const ordersContext = useContext(OrderContext);
    function addItemToOrder() {
        ordersContext.addOrder(menuItem)
    }
    return (
        <li className={styles.item}>
            <MenuCard>
                <div className={styles.image}>
                    <img src={pickl} alt="good food!" />
                </div>
                <div className={styles.content}>
                    <h3>{menuItem.name}</h3>
                    <address>{ menuItem.price}</address>
                    <p>{ menuItem.description}</p>
                </div>
                <div className={ styles.actions }>
                    <button onClick={addItemToOrder}>Buy!</button>
                </div>
            </MenuCard>
        </li>
  )
}

export default MenuItemLayout