import React from 'react';
import CartContextProvider from '../contexts/CartContext';
import Cart from '../components/shoppingCart/cart';
import Layout from '../components/generic/layout';

const ShoppingCart = () => {
    return (
        <Layout>
            <CartContextProvider>
                <Cart />
            </CartContextProvider>
        </Layout>
    );
}
 
export default ShoppingCart;