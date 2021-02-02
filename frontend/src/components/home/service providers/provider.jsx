import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useState } from "react";
import Title from "../../generic/title";

const Provider = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const type = isLightTheme ? theme.light.type : theme.dark.type;

    const [provider, setProvider] = useState({});

    // componentDidMount
    useEffect(() => {
        const API_URL = "/getProfile/";

        const loadData = async () => {
            const servideID = {
                userid: props.Service.service_id,
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(servideID),
            });

            const data = await response.json();

            setProvider(data);
        };
        loadData();
    }, [props.Service]);

    return (
        <div className="col-12 mb-3">
            <Card className={"p-3 shadow" + ui + border}>
                <div className="row">
                    <div className="col-md-3 col-sm-12 my-auto">
                        <Card.Img
                            variant="top"
                            src={`https://picsum.photos/id/${Math.floor(
                                Math.random() * 1000
                            )}/800`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/Default.png";
                            }}
                            alt="provider's"
                            className={"profile-pic rounded shadow" + border}
                        />
                    </div>

                    <Card.Body
                        className={
                            "col-md-9 col-sm-12 d-flex flex-column" + syntax
                        }
                    >
                        <Card.Title className="text-center mr-md-6">
                            {provider.service_name}
                        </Card.Title>
                        <Card.Text className="mt-auto">
                            <Title>Company: </Title> {provider.company_name}
                            <br />
                            <Title>Address: </Title> {provider.address}
                            <br />
                            <Title>Service type: </Title>{" "}
                            {provider.service_type}
                            <br />
                            <Title>Phone number: </Title> {provider.phone_1},{" "}
                            {provider.phone_2}
                            <br />
                            <Title>Description: </Title> {provider.description}
                            <br />
                        </Card.Text>
                        <Button
                            variant={type}
                            className="mt-auto"
                            as={Link}
                            to={"/service-provider/" + props.Service.service_id}
                        >
                            Show their services
                        </Button>
                    </Card.Body>
                </div>
            </Card>
        </div>
    );
};

export default Provider;
