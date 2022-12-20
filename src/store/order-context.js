import { createContext, useState } from "react";

const OrderContext = createContext({
    order: [],
    // eslint-disable-next-line no-undef
    orderedItems: 0,
    // addOrder: (orderItem) => { },
    // removeOrder: (id) => { },
    increaseOrder: (id) => { },
    decreaseOrder: (id) => { },
    deleteOrder: (id) => { },
    orderedItemsQuantity: (id) => 0,
    getQuantityForItems: (id) => 0
});

// TODO: price for a whole order
// TODO: group same items

export function OrderContextProvider(props) {
    // const [userOrder, setUserOrder] = useState([]);
    const [userCart, setUserCart] = useState([])

    // function addOrderHandler(orderItem) {
    //     setUserOrder((prevUserOrder) => {
    //         return prevUserOrder.concat(orderItem)
    //     });
    // }

    function orderedItemsQuantityHandler(id) {
        return userCart?.reduce(item => item.id === id).quantity || 0
    }

    // function removeOrderHandler(orderItemId) {
    //     setUserOrder((prevUserOrder) => {
    //         return prevUserOrder.filter(order => order.id !== orderItemId)
    //     })
    // }

    function getQuantityForItemId(orderItemId) {
        // const item = userCart.find(item => item.id === orderItemId)
        const count = userCart.filter(item => item.id === orderItemId).length
        return count
    }

    function increaseOrderHandler(orderItemId) {
        console.log(`increaseOrderHandler ${orderItemId}`)
        setUserCart(currentItems => {
            if (currentItems.find(item => item.id === orderItemId) == null) {
                return [...userCart, { orderItemId, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === orderItemId) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function reduceOrderItemQuantity(id) {
        setUserCart(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }


    function removeOrder(id) {
        setUserCart(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }




    const context = {
        // order: userOrder,
        order: userCart,
        orderedItems: userCart.length,
        // addOrder: addOrderHandler,
        // removeOrder: removeOrderHandler,
        increaseOrder: increaseOrderHandler,
        decreaseOrder: reduceOrderItemQuantity,
        deleteOrder: removeOrder,
        orderedItemsQuantity: orderedItemsQuantityHandler,
        getQuantityForItems: getQuantityForItemId
    };

    return (
        <OrderContext.Provider value={context}>
            {props.children}
        </OrderContext.Provider>
    )

}

export default OrderContext