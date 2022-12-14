import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { MenuItem } from "../model/MenuItemModel";
import { OrderCartItem } from "../model/OrderCardItemModel";


type OrderedItemsContext = {
    getOrderItemQuantity: (id: number) => number
    increaseOrderItemQuantity: (id: number) => void
    reduceOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void
    orderQuantity: number
    orderedItems: OrderCartItem[]
    orderedMenuItems: MenuItem[]
    // getAllMenuItems: () => Promise<MenuItem[]>
    clearOrder: () => void
}

const CreateOrderedItemsContext = createContext({} as OrderedItemsContext)

export function useOrderContext() {
    return useContext(CreateOrderedItemsContext)
}

type OrderedItemsProviderProps = {
    children: ReactNode
}

export function OrderedItemsProvider({ children }: OrderedItemsProviderProps) {
    const [orderedItems, setOrderItems] = useState<OrderCartItem[]>([])
    const [orderedMenuItems, setOrderedMenuItems] = useState<MenuItem[]>([])
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const getMenuItems = async() => {
        const fetchedMenuItems = await fetchMenuItems()
            setMenuItems(fetchedMenuItems)
        }
        getMenuItems()
    }, [])

    const fetchMenuItems = async () => {
        const res = await fetch('http://localhost:5000/menuItems')
        const data = await res.json()
        return data
    }

    // const getAllMenuItems = async () => {
    //     return menuItems
    // }

    const orderQuantity = orderedItems?.reduce((quantity, item) => item.quantity + quantity, 0)

    function clearOrder() {
        setOrderItems([]);
        setOrderedMenuItems([])
    }

    function getOrderItemQuantity(id: number) {
        return orderedItems.find(item => item.id === id)?.quantity || 0
    }

    function getMenuItemById(id: number) {
        return menuItems.find(item => item.id === id)
    }

    function increaseOrderItemQuantity(id: number) {
        const newMenuItem = getMenuItemById(id)!
        setOrderedMenuItems([...orderedMenuItems, newMenuItem!])
        setOrderItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...orderedItems, {id, quantity: 1, price: newMenuItem.price, name: newMenuItem.name}]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1, price: item.price + newMenuItem.price}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function reduceOrderItemQuantity(id: number) {
         const newMenuItem = getMenuItemById(id)!
        setOrderItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1, price: item.price - newMenuItem.price}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeOrderItem(id: number) {
        setOrderedMenuItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
        setOrderItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <CreateOrderedItemsContext.Provider
            value={{
                getOrderItemQuantity,
                increaseOrderItemQuantity,
                reduceOrderItemQuantity,
                removeOrderItem,
                orderedItems,
                orderQuantity,
                orderedMenuItems,
                // getAllMenuItems,
                clearOrder
        }}>
            {children}
        </CreateOrderedItemsContext.Provider>
    )

}