import { MenuItem } from '../../model/MenuItemModel'
import styles from './MenuItemLayout.module.css';
import { useOrderContext } from '../../store/OrdersContext';

import fireIcon from '../../assets/img/fire.png';
import vegeIcon from '../../assets/img/plant.png';
import noLactoseIcon from '../../assets/img/vegan.png';
import allCategoriesIcon from '../../assets/img/food.png';


interface MenuItemType {
    menuItem: MenuItem,
    index: number,
    setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>,
    setCurrentItem: React.Dispatch<React.SetStateAction<MenuItem>>
}

function MenuItemLayout({ menuItem, index, setIsModalOpen, setCurrentItem }: MenuItemType) {
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
    } = useOrderContext()
    const quantity = getOrderItemQuantity(menuItem.id)
    const selectedIcon = (dishType: String) => {
        if (dishType === 'vege') {
            return vegeIcon
        } else if (dishType === 'spicy') {
            return fireIcon
        } else if (dishType === 'lactoseFree'){
            return noLactoseIcon
        } else {
            return allCategoriesIcon
        }
    }
    const myIcon = selectedIcon(menuItem.category)

    return (
        <>
            <li className={styles.item}>
                <div className={styles.image}>
                    <img src={menuItem.imgUrl} alt="good food!" />
                    </div>
                <div className={styles.content}>
                        <h3>{menuItem.name} <img className={styles.categoryIcon} src={myIcon} alt="food category" /></h3>
                        <button onClick={() => {
                            setIsModalOpen(true)
                            setCurrentItem(menuItem)
                        }
                        }>Info</button>
                    {index < 4 ? <p>{menuItem.description}</p> : null}
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
        </li>
    </>
  )
}

export default MenuItemLayout