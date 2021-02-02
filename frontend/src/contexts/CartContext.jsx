import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const discount = 8;

    // componentDidMount
    useEffect(() => {
        const json = sessionStorage.getItem("items");
        const local = JSON.parse(json);

        if (local) setItems(local);
    }, []);

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("items");
        const local = JSON.parse(json);

        if (local !== items)
            sessionStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        let tmpPrice = 0;
        items.map((item) => (tmpPrice += item.count * item.price));
        setSubTotalPrice(tmpPrice);
        tmpPrice = Math.floor(tmpPrice - tmpPrice * (discount / 100));
        setTotalPrice(tmpPrice);
    }, [items]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    const handleAddOne = (id) => {
        let newItem = items.map((item) => {
            if (item.id === id) {
                item.count++;
                return item;
            }
            return item;
        });
        setItems([...newItem]);
    };

    const handleMinusOne = (id) => {
        let newItem = items.map((item) => {
            if (item.id === id) {
                item.count > 1 ? item.count-- : (item.count = 1);
                return item;
            }
            return item;
        });

        setItems([...newItem]);
    };

    const postCountUpdate = (id, count) => {
        let newItem = items.map((item) => {
            if (item.id === id) {
                item.count = count;
                return item;
            }
            return item;
        });
        setItems([...newItem]);
    };

    const handleRemove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                discount,
                totalPrice,
                handleRemove,
                handleAddOne,
                subTotalPrice,
                setTotalPrice,
                handleMinusOne,
                postCountUpdate,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
