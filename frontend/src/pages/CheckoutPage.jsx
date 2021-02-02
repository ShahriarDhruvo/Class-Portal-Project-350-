import React from "react";
import CartContextProvider from "../contexts/CartContext";
import Layout from "../components/generic/layout";
import Checkout from "../components/shoppingCart/checkout";

const CheckoutPage = () => {
    return (
        <Layout>
            <CartContextProvider>
                <Checkout />
            </CartContextProvider>
        </Layout>
    );
};

export default CheckoutPage;
