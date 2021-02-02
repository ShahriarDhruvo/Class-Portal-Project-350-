import React from "react";
import Layout from "../components/generic/layout";
import Services from "../components/home/service providers/services";
import LocationContextProvider from "../contexts/LocationContext";
import CartContextProvider from "../contexts/CartContext";

const ServiceProviders = () => {
    return (
        <Layout>
            <LocationContextProvider>
                <CartContextProvider>
                    <Services />
                </CartContextProvider>
            </LocationContextProvider>
        </Layout>
    );
};

export default ServiceProviders;
