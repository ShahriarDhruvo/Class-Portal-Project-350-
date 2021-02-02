import React from "react";
import Counter from "../generic/counter";
import { Table, Button } from "react-bootstrap";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import Icon from "@material-ui/core/Icon";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import emoji from "react-easy-emoji";
import Infobar from "../generic/infobar";

const Cart = () => {
    const {
        items,
        discount,
        totalPrice,
        handleRemove,
        subTotalPrice,
    } = useContext(CartContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    return (
        <div>
            {items.length > 0 ? (
                <div>
                    <section
                        className={
                            "jumbotron text-center p-3 mb-3" +
                            ui +
                            syntax +
                            border
                        }
                    >
                        <h5 className="jumbotron-heading my-auto cart-header">
                            Your Cart
                        </h5>
                    </section>
                    <div
                        // id="cart-table"
                        className={"shadow rounded mb-3" + border}
                    >
                        <Table responsive="sm" striped variant={variant}>
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-center align-middle"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center align-middle"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center align-middle"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center align-middle"
                                    >
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={uuidv4()}>
                                        <td className="text-center align-middle">
                                            {item.productName}
                                            <br />({item.qty} {item.unit})
                                        </td>
                                        <td className="text-center align-middle">
                                            <Counter id={item.id} />
                                        </td>
                                        <td className="text-center align-middle">
                                            Tk {item.count * item.price}
                                        </td>
                                        <td className="text-center align-middle">
                                            <button
                                                onClick={() => {
                                                    handleRemove(item.id);
                                                }}
                                                className="btn btn-xs btn-danger"
                                            >
                                                <DeleteTwoToneIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div
                        className={
                            "row text-center rounded mx-auto shadow" +
                            ui +
                            border +
                            custom_text
                        }
                    >
                        <div className="col-4 py-2 my-auto">
                            <div className="amount-label">Sub Total</div>
                            <div className="amount">Tk {subTotalPrice}</div>
                        </div>

                        <div className="col-4 py-2 my-auto">
                            <div className="amount-label">Discount</div>
                            <div className="amount">{discount}%</div>
                        </div>

                        <div className="col-4 py-2 my-auto">
                            <div className="amount-label">Grand Total</div>
                            <div className="amount">Tk {totalPrice}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-3">
                    <Infobar>Your cart is empty {emoji("🙁")}</Infobar>
                </div>
            )}

            <div className="row mt-3">
                <div className="col-sm-12 mb-2 col-md-6">
                    <Button
                        variant={"outline-" + type}
                        className="w-100"
                        as={Link}
                        to="/"
                    >
                        <Icon
                            style={{
                                fontSize: "1.125rem",
                            }}
                            className="align-middle mr-2 mb-1"
                        >
                            add_shopping_cart
                        </Icon>
                        Continue Shopping
                    </Button>
                </div>
                <div className="col-sm-12 col-md-6 mb-2 text-right">
                    <Button
                        variant={type}
                        className="w-100"
                        disabled={!items.length > 0}
                    >
                        <Icon
                            style={{
                                fontSize: "1.125rem",
                            }}
                            className="align-middle mr-2 mb-1"
                        >
                            check
                        </Icon>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
