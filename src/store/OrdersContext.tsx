import { createContext, ReactNode, useContext } from "react"
import OrderItem from "../components/orders/OrderItem"
import { useLocalStorage } from "./LocalStorage"

type OrderedItemsProviderProps = {
    children: ReactNode
}

type OrderCartItem = {
    id: number,
    quantity: number
}

type OrderedItemsContext = {
    getOrderedItemQuantity: (id: number) => number
    addOrderItemQuantity: (id: number) => void
    removeOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void
    orderQuantity: number
    orderItems: OrderCartItem[]
}

const OrderedItemsContext = createContext({} as OrderedItemsContext)

export function useOrderContext() {
    return useContext(OrderedItemsContext)
}

export function OrderedItemsProvider({ children }: OrderedItemsProviderProps) {

    const [orderItems, setOrderItems] = useLocalStorage<OrderCartItem[]>("order-items", [])
    const orderQuantity = orderItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function getOrderedItemQuantity(id: number) {
        return orderItems.find(item => item.id === id)?.quantity || 0
    }

    function addOrderItemQuantity(id: number) {
        setOrderItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...orderItems, {id, quantity: 1}]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeOrderItemQuantity(id: number) {
        setOrderItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeOrderItem(id: number) {
        setOrderItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <OrderedItemsContext.Provider
            value={{
                getOrderedItemQuantity,
                addOrderItemQuantity,
                removeOrderItemQuantity,
                removeOrderItem,
                orderQuantity,
                orderItems
        }}>
            {children}
        </OrderedItemsContext.Provider>
    )

}