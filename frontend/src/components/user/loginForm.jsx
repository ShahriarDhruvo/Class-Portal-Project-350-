import React, { useContext, useRef, useState } from "react";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomAlert from "../generic/CustomAlert";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const LoginForm = (props) => {
    const form = useRef(null);
    const [status, setStatus] = useState("");
    const { handleAuthentication } = useContext(AuthenticationContext);

    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const [showVerificationArea, setShowVerificationArea] = useState(false);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = !showVerificationArea
            ? isServiceProvider
                ? "/servicelogin/"
                : "/login/"
            : isServiceProvider
            ? "/serviceverify/"
            : "/verify/";

        const loadData = async () => {
            const formData = new FormData(form.current);
            let object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(object),
                });

                const data = await response.json();

                if (!response.ok) setStatus(data.message);
                else if (!showVerificationArea) {
                    setStatus("");
                    setShowVerificationArea(true);
                } else {
                    localStorage.setItem("userID", data.userid);
                    localStorage.setItem("username", data.username);
                    // window.location.replace("/");
                    localStorage.setItem(
                        "isServiceProvider",
                        isServiceProvider
                    );
                    handleAuthentication("Yes");
                    props.history.push("/");
                }
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    const handleCheck = () => setIsServiceProvider(!isServiceProvider);

    return (
        <div
            className={"card mx-auto" + ui + syntax + border}
            style={{ maxWidth: "30rem" }}
        >
            <article className="card-body p-md-5 mx-auto">
                <div className="d-flex justify-content-between mb-4 mx-0">
                    <div className="w-50 p-0">
                        <img
                            src="/img/profile_pic.png"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Default.png";
                            }}
                            alt="profile"
                            className={"rounded w-100" + border}
                        />
                    </div>

                    <div className="text-center my-auto">
                        <Link
                            to="/registration"
                            className={"btn btn-outline-" + type}
                        >
                            Sign up
                        </Link>
                        <div className="my-3 text-center divider-text">
                            <span className={"px-4" + ui}>OR</span>
                        </div>
                        <h5 className="card-title">Sign in</h5>
                    </div>
                </div>

                <form ref={form} onSubmit={handleSubmit}>
                    {status && <CustomAlert status={status} />}

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
                            <option defaultValue="">+880</option>
                            <option value="1">+972</option>
                            <option value="2">+198</option>
                            <option value="3">+701</option>
                        </select> */}
                        <input
                            required
                            name="phone"
                            type="number"
                            placeholder="Phone number"
                            className="form-control rounded-0"
                        />
                    </div>

                    {showVerificationArea ? (
                        <div
                            className={
                                "form-group input-group rounded" + border
                            }
                        >
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0">
                                    <FontAwesomeIcon icon={["fas", "code"]} />
                                </span>
                            </div>
                            <input
                                required
                                name="code"
                                type="number"
                                placeholder="Verification Code"
                                className="form-control rounded-0"
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <input type="checkbox" onClick={handleCheck} />
                            <label className="ml-1">
                                Login as a Service Provider
                            </label>
                        </div>
                    )}

                    {showVerificationArea && (
                        <div className="text-center mb-3">
                            <small>
                                A 6 digit verification code has been sent to
                                this phone number, type it to login into your
                                account
                            </small>
                        </div>
                    )}

                    <div className="form-group">
                        <Button type="submit" variant={type} className="w-100">
                            {showVerificationArea
                                ? "Login"
                                : "Send Verification Code"}
                        </Button>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default withRouter(LoginForm);
