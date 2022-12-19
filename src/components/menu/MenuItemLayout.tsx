import React, {useContext} from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import styles from './MenuItemLayout.module.css';
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
                    <img src={menuItem.imgUrl} alt="good food!" />
                </div>
                <div className={styles.content}>
                    <h3>{menuItem.name}</h3>
                    <p>{menuItem.description}</p>
                    <address>Price: { menuItem.price}</address>
                </div>
                {/* div class that holds ADD button or 2 rows and 3 columns of buttons and text  */}
                <div className={styles.actions}> 
                    {ordersContext.orderedItems === 0 ? (
                        <button onClick={addItemToOrder}>Buy!</button>
                    ) : (
                        <button onClick={addItemToOrder}>Buy more!</button>
                    )}
                    
                </div>
            </MenuCard>
        </li>
  )
}

export default MenuItemLayout