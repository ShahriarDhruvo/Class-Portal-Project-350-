import React, { useContext, useState, useEffect } from "react";
import Provider from "./provider";
import { v4 as uuidv4 } from "uuid";
import { LocationContext } from "../../../contexts/LocationContext";
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";

const Providers = () => {
    const { location } = useContext(LocationContext);

    const [providers, setProviders] = useState([]);

    // componentDidMount
    useEffect(() => {
        const API_URL = "getServiceName/" + location.id;

        const loadData = async () => {
            try {
                const apiData = [];
                const response = await fetch(API_URL);
                const data = await response.json();

                data.services.map((service) => apiData.push(service));
                setProviders(apiData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, [location]);

    return location && location.district && location.area ? (
        !providers.length > 0 ? (
            <div className="mt-4">
                <Infobar>
                    Sorry, currently we are not providing service in this area{" "}
                    {emoji("🙁")}
                </Infobar>
            </div>
        ) : (
            <div className="row mt-4">
                {providers.map((provider) => (
                    <Provider Service={provider} key={uuidv4()} />
                ))}
            </div>
        )
    ) : (
        <div className="mt-4">
            <Infobar>
                Select a location to see the service providers {emoji("😀")}
            </Infobar>
        </div>
    );
};

export default Providers;
