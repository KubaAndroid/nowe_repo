import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { OrderedItemsProvider } from './store/OrdersContext';
// import { OrderContextProvider } from './store/order-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <BrowserRouter>
      {/* <OrderContextProvider> */}
      <OrderedItemsProvider>
        <App />
        </OrderedItemsProvider>
        {/* </OrderContextProvider> */}
      </BrowserRouter>
    </React.StrictMode>
);
