import { MenuItem } from '../../model/MenuItemModel'
import styles from './MenuItemLayout.module.css';
import MenuCard from './MenuCard';
import { useOrderContext } from '../../store/OrdersContext';


interface MenuItemType {
    menuItem: MenuItem,
    setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>,
    setCurrentItem: React.Dispatch<React.SetStateAction<MenuItem>>
}

function MenuItemLayout({ menuItem, setIsModalOpen, setCurrentItem }: MenuItemType) {
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
    } = useOrderContext()
    let quantity = getOrderItemQuantity(menuItem.id)
    return (
        <>
            <li className={styles.item}>
                <MenuCard>
                <div className={styles.image}>
                    <img src={menuItem.imgUrl} alt="good food!" />
                    </div>
                    {/* TODO: add spicy/vege/lactose free ICONS   */}
                <div className={styles.content}>
                        <h3>{menuItem.name}</h3>
                        <button onClick={() => {
                            setIsModalOpen(true)
                            setCurrentItem(menuItem)
                        }
                        }>Info</button>
                    <p>{menuItem.description}</p>
                    <address>Price: { menuItem.price}</address>
                </div>
                <div className={styles.actions}> 
                    {quantity === 0 ? (
                        <div>
                            <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>Buy!</button>
                        </div>
                    ) : (
                            <div>
                                <button onClick={() => reduceOrderItemQuantity(menuItem.id)}>-</button>
                                <button>{quantity}</button>
                                <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>+</button>
                            </div>
                    )}
                    
                </div>
            </MenuCard>
        </li>
    </>
  )
}

export default MenuItemLayout