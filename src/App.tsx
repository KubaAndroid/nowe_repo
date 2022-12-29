import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Layout from './components/layout/Layout';
import MainNavigation from './components/nav/MainNavigation';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderPage from './pages/OrderPage';
import OrdersListPage from './pages/OrdersListPage';

function App() {
  return (
    // <Layout>
      <>
      <MainNavigation />
        <Routes>
          <Route path='/' element={<MenuPage />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/orderslist' element={<OrdersListPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/orderConfirm' element={<OrderConfirmationPage />} />
      </Routes>
        <Footer />
        </>
  );
}

export default App;
