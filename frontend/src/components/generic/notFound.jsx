import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";

const NotFound = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const type = isLightTheme ? theme.light.type : theme.dark.type;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    return (
        <div
            className="d-flex justify-content-center mx-auto"
            style={{ maxWidth: "55rem" }}
        >
            <div className="notfound pb-4 pb-md-5">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2 className={"mb-3 mt-5 pt-3" + syntax}>
                    Oops! This Page Could Not Be Found
                </h2>
                <p className={syntax}>
                    Sorry but the page you are looking for does not exist, have
                    been removed. name changed or is temporarily unavailable
                </p>
                <Button variant={type} className="mt-3" as={Link} to="/">
                    Go To Homepage
                </Button>
                <Button
                    variant={type}
                    className="mt-3 ml-2"
                    onClick={() => props.history.goBack()}
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default withRouter(NotFound);
