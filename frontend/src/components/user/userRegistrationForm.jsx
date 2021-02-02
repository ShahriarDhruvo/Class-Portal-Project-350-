import React, { useContext, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

import CustomAlert from "../generic/CustomAlert";

const RegistrationForm = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState("");
    const [isServiceProvider, setIsServiceProvider] = useState(false);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const link = isLightTheme ? theme.light.link : theme.dark.link;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleSelect = (e) => {
        e.target.value === "2"
            ? setIsServiceProvider(true)
            : setIsServiceProvider(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = isServiceProvider ? "/serviceregister/" : "/register/";

        const loadData = async () => {
            const formData = new FormData(form.current);

            let object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            // for (var pair of formData.entries()) {
            //     console.log(pair[0] + " - " + pair[1]);
            // }
            // console.log(JSON.stringify(object));

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(object),
                });

                const data = await response.json();

                if (!response.ok) setStatus(data[Object.keys(data)[0]]);
                else props.history.push("/login/");
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    return (
        <div
            className={"card shadow mx-auto" + ui + syntax + border}
            style={{ maxWidth: "30rem" }}
        >
            <article
                style={{ maxWidth: "28rem" }}
                className="card-body col mx-auto"
            >
                <h4 className="card-title text-center">Create an Account</h4>
                <p className="text-center">
                    Get started with your free account
                </p>

                <form ref={form} onSubmit={handleSubmit}>
                    {status && <CustomAlert status={status} />}

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "user"]} />
                            </span>
                        </div>
                        <input
                            name={
                                isServiceProvider ? "service_name" : "username"
                            }
                            type="text"
                            placeholder="Username"
                            className="form-control rounded-0"
                        />
                    </div>

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "phone"]} />
                            </span>
                        </div>
                        {/* <select
                            className="custom-select"
                            style={{ maxWidth: "85px" }}
                        >
                            <option defaultValue="+880">+880</option>
                            <option value="1">+972</option>
                            <option value="2">+198</option>
                            <option value="3">+701</option>
                        </select> */}
                        <input
                            name="phone"
                            type="number"
                            className="form-control rounded-0"
                            placeholder="Phone number"
                        />
                    </div>

                    <div className={"form-group input-group rounded" + border}>
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                <FontAwesomeIcon icon={["fas", "building"]} />
                            </span>
                        </div>
                        <select
                            required
                            onChange={handleSelect}
                            className="form-control rounded-0"
                        >
                            <option defaultValue="1">Customer</option>
                            <option value="2">Service Provider</option>
                        </select>
                    </div>

                    {isServiceProvider && (
                        <>
                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "id-card"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="nid"
                                    type="number"
                                    className="form-control rounded-0"
                                    placeholder="NID number"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "id-card"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="trade_license"
                                    type="number"
                                    className="form-control rounded-0"
                                    placeholder="Trade license number"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "building"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="company_name"
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Company name"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "taxi"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="service_type"
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Service type"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "hand-holding-usd"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="delivery_charge"
                                    type="number"
                                    className="form-control rounded-0"
                                    placeholder="Delivery charge"
                                />
                            </div>

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "plus"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name="description"
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Description"
                                />
                            </div>

                            {/* <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "home"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    name=""
                                    disabled
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="House"
                                />
                                <input
                                    name=""
                                    disabled
                                    type="text"
                                    className="form-control rounded-0"
                                    placeholder="Road"
                                />
                            </div> */}

                            <div
                                className={
                                    "form-group input-group rounded" + border
                                }
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text rounded-0">
                                        <FontAwesomeIcon
                                            icon={["fas", "location-arrow"]}
                                        />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control rounded-0"
                                    placeholder="Location Description"
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <Button variant={type} type="submit" className="w-100">
                            Create Account
                        </Button>
                    </div>

                    <div className={"text-center" + link}>
                        Have an account? <Link to="/login">Log In</Link>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default withRouter(RegistrationForm);
