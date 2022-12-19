import { createContext, useState } from "react";

const OrderContext = createContext({
    order: [],
    orderedItems: 0,
    addOrder: (orderItem) => { },
    removeOrder: (id) => { }
});

export function OrderContextProvider(props) {
    const [userOrder, setUserOrder] = useState([]);

    function addOrderHandler(orderItem) {
        setUserOrder((prevUserOrder) => {
            return prevUserOrder.concat(orderItem)
        });
    }
    function removeOrderHandler(orderItemId) {
        setUserOrder((prevUserOrder) => {
            return prevUserOrder.filter(order => order.id !== orderItemId)
        })
    }

    const context = {
        order: userOrder,
        orderedItems: userOrder.length,
        addOrder: addOrderHandler,
        removeOrder: removeOrderHandler
    };

    return (
        <OrderContext.Provider value={context}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContext