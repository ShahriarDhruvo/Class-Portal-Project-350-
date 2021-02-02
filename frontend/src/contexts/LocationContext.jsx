import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
    // Dummy datas
    // const dummyLocation = {
    //     Dhaka: ['Gulshan', 'Banani', 'Dhanmondi', 'Mirpur'],
    //     Sylhet: ['Amberkhana', 'Madina Market', 'Shahjalal University of Science and Technology', 'Bagbari'],
    //     Chittagong: ['College Road', 'Potenga', 'Coxs Bazar'],
    //     Rajshahi: ['Rajshahi University', 'RUET', 'Noyabajar'],
    // };

    // locationsfs ==> locations from server
    const [locationsfs, setLocationsfs] = useState({});
    const [areaIDs, setAreaIDs] = useState({});
    const [location, setLocation] = useState({
        id: -1,
        district: "",
        area: "",
    });

    // componentDidMount
    useEffect(() => {
        const API_URL = "/getServiceArea/";

        const loadData = async () => {
            const apiData = {};
            const response = await fetch(API_URL);
            const data = await response.json();
            const areaIDs = {};

            let chk;

            data.areas.map((area) => {
                chk = area.district in apiData;

                areaIDs[area.area_name] = area.area_id;

                if (chk) return apiData[area.district].push(area.area_name);
                return (
                    (apiData[area.district] = []),
                    apiData[area.district].push(area.area_name)
                );
            });
            setLocationsfs(apiData);
            setAreaIDs(areaIDs);
        };
        loadData();

        const json = sessionStorage.getItem("location");
        const localLocation = JSON.parse(json);

        if (localLocation) setLocation(localLocation);
    }, []);

    // componentDidUpdate
    useEffect(() => {
        const json = sessionStorage.getItem("location");
        const localLocation = JSON.parse(json);

        if (localLocation !== location)
            sessionStorage.setItem("location", JSON.stringify(location));
    }, [location]);

    const changeLocation = (district, area) => {
        const id = areaIDs[area];
        setLocation({ ...location, id, district, area });
    };

    return (
        <LocationContext.Provider
            value={{ locationsfs, location, changeLocation }}
        >
            {props.children}
        </LocationContext.Provider>
    );
};

export default LocationContextProvider;
