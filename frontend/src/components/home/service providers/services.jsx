import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import Service from "./service";
import { v4 as uuidv4 } from "uuid";
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useParams } from "react-router-dom";

const Services = () => {
    const [services, setServices] = useState([]);
    const [sName, setSName] = useState("");
    const params = useParams();

    // componentDidMount
    useEffect(() => {
        const API_URL = "/ownProducts/";

        const loadData = async () => {
            const servideID = {
                service_id: params.id,
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

            setServices(data.products);
        };
        loadData();
    }, [params]);

    useEffect(() => {
        if (services.length > 0) {
            const API_URL = "/getProfile/";

            const loadData = async () => {
                const servideID = {
                    userid: services[0].service_id,
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

                setSName(data.service_name);
            };
            loadData();
        }
    }, [services]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    return (
        <div>
            <div className={"text-center" + syntax}>
                <div className={"inner rounded mb-4" + border}>
                    <Image
                        className="w-100 profile-pic"
                        alt="profile picture"
                        src={`https://picsum.photos/id/${Math.floor(
                            Math.random() * 1000
                        )}/800`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/img/profile_pic_default.png";
                        }}
                    />
                </div>

                <Infobar>
                    {sName ? sName + " " : "Company name"}
                    {emoji("🤪")}
                </Infobar>
                <h4 className={"my-4" + custom_text}>Our Services ...</h4>
            </div>

            {services && services.length > 0 ? (
                <div className="row">
                    {services.map((service) => (
                        <Service serviceInfo={service} key={uuidv4()} />
                    ))}
                </div>
            ) : (
                <Infobar>
                    Sorry, we are not providing any services in this area at
                    this moment {emoji("☹")}
                </Infobar>
            )}
        </div>
    );
};

export default Services;
