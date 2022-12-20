import React, {useContext, useEffect} from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import styles from './MenuItemLayout.module.css';
import MenuCard from './MenuCard';
import { useOrderContext } from '../../store/OrdersContext';
// import OrderContext from '../../store/order-context';

interface MenuItemType {
    menuItem: MenuItem
}

function MenuItemLayout({ menuItem }: MenuItemType) {
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
        removeOrderItem,
        orderQuantity
    } = useOrderContext()
    let quantity = getOrderItemQuantity(menuItem.id)
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
                    {quantity === 0 ? (
                        <div>
                            <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>Buy!</button>
                        </div>
                    ) : (
                            <div>
                                <button onClick={() => reduceOrderItemQuantity(menuItem.id)}>-</button>
                                <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>{quantity}</button>
                                <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>+</button>
                            </div>
                    )}
                    
                </div>
            </MenuCard>
        </li>
  )
}

export default MenuItemLayout