import { MenuItem } from '../../model/MenuItemModel'
import styles from './MenuItemLayout.module.css';
import MenuCard from './MenuCard';
import { useOrderContext } from '../../store/OrdersContext';

interface MenuItemType {
    menuItem: MenuItem
}

function MenuItemLayout({ menuItem }: MenuItemType) {
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        // removeOrderItemQuantity,
        // removeOrderItem
        // orderQuantity
    } = useOrderContext()

    const itemsQuantity = getOrderItemQuantity(menuItem.id)

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
                    {itemsQuantity === 0 ? (
                        <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>Buy!</button>
                    ) : (
                            <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>Buy more! { itemsQuantity }</button>
                    )}
                    {/* {ordersContext.orderedItems === 0 ? (
                        <button onClick={addItemToOrder}>Buy!</button>
                    ) : (
                        <button onClick={addItemToOrder}>Buy more!</button>
                    )} */}
                    
                </div>
            </MenuCard>
        </li>
  )
}

export default MenuItemLayout