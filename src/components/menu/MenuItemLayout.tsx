import React, {useContext, useEffect, useState} from 'react'
import { MenuItem } from '../../model/MenuItemModel'
import styles from './MenuItemLayout.module.css';
import MenuCard from './MenuCard';
import { useOrderContext } from '../../store/OrdersContext';
import MenuModal from './MenuModal'

interface MenuItemType {
    menuItem: MenuItem
}

function MenuItemLayout({ menuItem }: MenuItemType) {
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
    const {
        getOrderItemQuantity,
        increaseOrderItemQuantity,
        reduceOrderItemQuantity,
        removeOrderItem,
        orderQuantity
    } = useOrderContext()
    let quantity = getOrderItemQuantity(menuItem.id)
    return (
        <>
            {isModalOpen && <MenuModal openedModal={setIsModalOpen} />}
            <li className={styles.item}>
                <MenuCard>
                <div className={styles.image}>
                    <img src={menuItem.imgUrl} alt="good food!" />
                </div>
                <div className={styles.content}>
                    <h3>{menuItem.name} <button  onClick={() => setIsModalOpen(true)}>Info</button></h3>
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
                                <button onClick={() => increaseOrderItemQuantity(menuItem.id)}>{quantity}</button>
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