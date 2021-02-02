import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Counter = (props) => {
    const { items, handleAddOne, handleMinusOne, postCountUpdate } = useContext(
        CartContext
    );
    const [count, setCount] = useState(1);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    useEffect(() => {
        items.map((item) =>
            item.id === props.id ? setCount(item.count) : undefined
        );
    }, [items, props.id]);

    return (
        <div className="d-flex justify-content-center">
            <Icon
                style={{
                    fontSize: "1.125rem",
                    color: "#0275d8",
                }}
                onClick={() => handleAddOne(props.id)}
                className="mt-1"
            >
                add_circle
            </Icon>
            <input
                type="number"
                className={"show-cart-count mx-1" + syntax}
                value={count}
                onChange={(e) => setCount(e.target.value)}
                onBlur={(e) => postCountUpdate(props.id, e.target.value)}
                onKeyDown={(e) =>
                    ["e", "E", "+", "-", "."].includes(e.key) &&
                    e.preventDefault()
                }
            />
            <Icon
                style={{
                    fontSize: "1.125rem",
                    color: "#d9534f",
                }}
                onClick={() => handleMinusOne(props.id)}
                className="mt-1"
            >
                remove_circle
            </Icon>
        </div>
    );
};

export default Counter;
