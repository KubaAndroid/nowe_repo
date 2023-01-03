import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { MenuItem } from "../model/MenuItemModel";
import { OrderCartItem } from "../model/OrderCardItemModel";
import { OrderModel } from "../model/OrderModel";
import { UserModel } from "../model/UserModel";


type OrderedItemsContext = {
    getOrderItemQuantity: (id: number) => number
    increaseOrderItemQuantity: (id: number) => void
    reduceOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void

    orderQuantity: number
    orderedItems: OrderCartItem[]
    orderedMenuItems: MenuItem[]

    getAllMenuItems: () => Promise<MenuItem[]>
    clearOrder: () => void
    getMenuItemById: (id: number) => MenuItem | undefined
    getClientById: (id: number) => UserModel | undefined
    allMenuItems: MenuItem[]
    filteredMenuItems: MenuItem[]
    setFilteredMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
    sortMenuItemsByPrice: (ascending: boolean) => void
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

    const [allMenuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

    const [ordersList, setOrdersList] = useState<OrderModel[]>([])
    const [clientsList, setClientsList] = useState<UserModel[]>([])


    // FORCE UPDATE
    const [, updateState] = useState<object>({});
    const forceUpdate = useCallback(() => updateState({}), []);



    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrders()
            // console.log(fetchedOrders)
            setOrdersList(fetchedOrders)
        }
        const getClients = async () => {
            const fetchedClients = await fetchClients()
            // console.log(fetchedClients)
            setClientsList(fetchedClients)
            
        }
        getMenuItems()
        getOrders()
        getClients()
    }, [])

    const fetchMenuItems = async () => {
        const res = await fetch('http://localhost:5000/menuItems')
        const data = await res.json()
        return data
    }

    const fetchOrders = async() => {
        const res = await fetch('http://localhost:5000/orders')
        const data = await res.json()
        return data
    }

    const fetchClients = async() => {
        const res = await fetch('http://localhost:5000/users')
        const data = await res.json()
        return data
    }

    
    const getMenuItems = async () => {
        if (allMenuItems.length < 1) {
            const fetchedMenuItems = await fetchMenuItems()
            setMenuItems(fetchedMenuItems)
            setFilteredMenuItems(fetchedMenuItems)
            return fetchedMenuItems
        } else {
            return allMenuItems
        }
    }

    const getAllMenuItems = async() => {
        return await getMenuItems()
    }

    function sortMenuItemsByPrice(ascending: Boolean): void {
    if (ascending) {
        const sortedByPriceAsc = filteredMenuItems.sort((a: MenuItem, b: MenuItem) => a.price > b.price ? 1 : -1)
        setFilteredMenuItems(sortedByPriceAsc)
        console.log(filteredMenuItems)
        // forceUpdate()
    } else {
        const sortedByPriceDesc = filteredMenuItems.sort((a: MenuItem, b: MenuItem) => a.price < b.price ? 1 : -1)
        console.log(sortedByPriceDesc)
        setFilteredMenuItems(filteredMenuItems)
        // forceUpdate()
    }
  }

    const orderQuantity = orderedItems?.reduce((quantity, item) => item.quantity + quantity, 0)

    function clearOrder() {
        setOrderItems([]);
        setOrderedMenuItems([])
    }

    function getOrderItemQuantity(id: number) {
        return orderedItems.find(item => item.id === id)?.quantity || 0
    }

    function getMenuItemById(id: number) {
        return allMenuItems.find(item => item.id === id)
    }

    const getClientById = (id: number) => {
        return clientsList.find(user => user.id === id)
    }

    function getOrderById(id: number) {
        return ordersList.find(order => order.id === id)
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
                getAllMenuItems,
                clearOrder,
                getMenuItemById,
                getClientById,
                allMenuItems,
                filteredMenuItems,
                setFilteredMenuItems,
                sortMenuItemsByPrice
        }}>
            {children}
        </CreateOrderedItemsContext.Provider>
    )

}