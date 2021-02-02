import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import emoji from "react-easy-emoji";
import Infobar from "../generic/infobar";

const Checkout = () => {
    const { items, discount, totalPrice } = useContext(CartContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const success = isLightTheme ? theme.light.success : theme.dark.success;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    return (
        <div className={"card" + ui + syntax + border}>
            <div className="card-body row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ opacity: "0.7" }}>Your cart</span>
                        <span className={"badge badge-pill badge-" + type}>
                            {items.length}
                        </span>
                    </h4>

                    {items.length > 0 ? (
                        <div
                            className={"rounded mb-3" + border}
                            style={{ height: "15rem", overflow: "scroll" }}
                        >
                            <Table responsive="sm" striped variant={variant}>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="align-middle">
                                                {item.productName}
                                                <br />
                                                <small
                                                    style={{
                                                        opacity: "0.7",
                                                    }}
                                                >
                                                    Item count: {item.count},
                                                    Per Item Price: Tk
                                                    {item.price}
                                                </small>
                                            </td>
                                            <td className="text-right align-middle">
                                                Tk {item.count * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <div className="mb-3">
                            <Infobar>Your cart is empty {emoji("🙁")}</Infobar>
                        </div>
                    )}

                    <div className={"text-center mb-3" + link}>
                        <Link to="/cart">Back to shopping cart</Link>
                    </div>

                    <div className={"rounded mb-3" + border}>
                        <Table responsive="sm" striped variant={variant}>
                            <tbody>
                                <tr>
                                    <td
                                        className={
                                            "align-middle text-" + success
                                        }
                                    >
                                        <div>
                                            <h6 className="my-0">Discount</h6>
                                            <small>
                                                For Early Birds: {discount}%
                                            </small>
                                        </div>
                                    </td>
                                    <td className="text-right align-middle">
                                        Tk -
                                        {Math.floor(
                                            totalPrice * (discount / 100)
                                        )}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="align-middle">
                                        <span>Total (BDT)</span>
                                    </td>
                                    <td className="text-right align-middle">
                                        <strong>TK {totalPrice}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <form className={"card p-2" + ui + border}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Promo code"
                                className="form-control"
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    Redeem
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Shipping address</h4>
                    <form className="needs-validation" noValidate="">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="username">
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "user"]}
                                    />
                                    User name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="username"
                                    // defaultValue=""
                                    className={"form-control" + border}
                                    placeholder="Ayesha Sultana"
                                />
                                <div className="invalid-feedback">
                                    Valid user name is required.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone">
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "phone"]}
                                    />
                                    Phone
                                </label>
                                <input
                                    required
                                    id="phone"
                                    type="phone"
                                    placeholder="012xxxxxxxx"
                                    className={"form-control" + border}
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid phone number for
                                    shipping updates.
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="house_no">House No</label>
                                <input
                                    required
                                    type="text"
                                    id="house_no"
                                    placeholder="8"
                                    className={
                                        "form-control text-center" + border
                                    }
                                />
                                <div className="invalid-feedback">
                                    Please select a valid house.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="road_no">Road No</label>
                                <input
                                    required
                                    type="text"
                                    id="road_no"
                                    placeholder="2/B"
                                    className={
                                        "form-control text-center" + border
                                    }
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid road number.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="postal_code">
                                    Postal code
                                    <span style={{ opacity: "0.7" }}>
                                        (Optional)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="postal_code"
                                    placeholder="1209"
                                    className={
                                        "form-control text-center" + border
                                    }
                                />
                                <div className="invalid-feedback">
                                    Postal code code required.
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address">Address</label>
                            <input
                                required
                                type="text"
                                id="address"
                                placeholder="Sector-17, Uttara, Dhaka"
                                className={"form-control" + border}
                            />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>

                        <hr
                            className="mb-4"
                            style={{
                                opacity: "0.2",
                                borderColor: "inherit",
                            }}
                        />

                        <div className="custom-control custom-checkbox">
                            <input
                                id="save-info"
                                type="checkbox"
                                className="custom-control-input"
                            />
                            <label
                                htmlFor="save-info"
                                className="custom-control-label"
                            >
                                Save this information for next time
                            </label>
                        </div>

                        <hr
                            className="mb-4"
                            style={{
                                borderColor: "inherit",
                                opacity: "0.2",
                            }}
                        />

                        <h4 className="mb-3">Payment</h4>

                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input
                                    disabled
                                    id="bkash"
                                    type="radio"
                                    name="paymentMethod"
                                    className="custom-control-input"
                                />
                                <label
                                    htmlFor="bkash"
                                    className="custom-control-label"
                                >
                                    Bkash
                                </label>
                            </div>

                            <div className="custom-control custom-radio">
                                <input
                                    required
                                    type="radio"
                                    defaultChecked
                                    id="cashOnDelivery"
                                    name="paymentMethod"
                                    className="custom-control-input"
                                />
                                <label
                                    htmlFor="cashOnDelivery"
                                    className="custom-control-label"
                                >
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={["fas", "hand-holding-usd"]}
                                    />
                                    Cash on delivery
                                </label>
                            </div>
                        </div>

                        <hr
                            className="mb-4"
                            style={{
                                borderColor: "inherit",
                                opacity: "0.2",
                            }}
                        />

                        <Button
                            type="submit"
                            variant={type}
                            disabled={!items.length}
                        >
                            Confirm Purchase
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Checkout);
