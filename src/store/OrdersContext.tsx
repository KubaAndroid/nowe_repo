import { createContext, ReactNode, useContext } from "react"
import { useLocalStorage } from "./LocalStorage"


type OrderCartItem = {
    id: number,
    quantity: number
}

type OrderedItemsContext = {
    getOrderItemQuantity: (id: number) => number
    increaseOrderItemQuantity: (id: number) => void
    reduceOrderItemQuantity: (id: number) => void
    removeOrderItem: (id: number) => void
    orderQuantity: number
    orderItems: OrderCartItem[]
}

const CreateOrderedItemsContext = createContext({} as OrderedItemsContext)

export function useOrderContext() {
    return useContext(CreateOrderedItemsContext)
}

type OrderedItemsProviderProps = {
    children: ReactNode
}

export function OrderedItemsProvider({ children }: OrderedItemsProviderProps) {
    const [orderItems, setOrderItems] = useLocalStorage<OrderCartItem[]>("order-items", [])

    const orderQuantity = orderItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function getOrderItemQuantity(id: number) {
        return orderItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseOrderItemQuantity(id: number) {
        console.log(`addOrderItemQuantity id: ${id}`)
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

    function reduceOrderItemQuantity(id: number) {
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
        <CreateOrderedItemsContext.Provider
            value={{
                getOrderItemQuantity,
                increaseOrderItemQuantity,
                reduceOrderItemQuantity,
                removeOrderItem,
                orderItems,
                orderQuantity
        }}>
            {children}
        </CreateOrderedItemsContext.Provider>
    )

}