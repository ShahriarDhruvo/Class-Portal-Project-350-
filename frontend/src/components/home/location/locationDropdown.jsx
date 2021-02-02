import React, { useState, useContext, useEffect } from "react";
import DropDown from "./dropDown";
import { LocationContext } from "../../../contexts/LocationContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

const LocationDropDown = () => {
    const { locationsfs, changeLocation } = useContext(LocationContext);

    const json = sessionStorage.getItem("location");
    const localLocation = JSON.parse(json)
        ? JSON.parse(json)
        : { district: "", area: "" };

    const [district, setDistrict] = useState(localLocation.district);
    const [area, setArea] = useState(localLocation.area);
    const [areas, setAreas] = useState([]);

    const districts = Object.keys(locationsfs);

    // componentDidUpdate
    useEffect(() => {
        setAreas(locationsfs[localLocation.district]);
    }, [locationsfs, localLocation.district]);

    const handleDistrictSelect = (e) => {
        setArea("");
        setDistrict(e);
        setAreas(locationsfs[e]);
        changeLocation(e, "");
    };

    const handleAreaSelect = (e) => {
        setArea(e);
        changeLocation(district, e);
    };

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    return (
        <div>
            <div className={"text-center mt-2" + syntax}>
                <h2>
                    Why fear, when{" "}
                    <span className="logo-text">ProjectX</span>{" "}
                    is here!
                </h2>
            </div>
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6">
                    <DropDown
                        title={district ? district : "District"}
                        values={districts ? districts : []}
                        handleSelect={handleDistrictSelect}
                        status=""
                    />
                </div>
                <div className="col-sm-12 col-md-6">
                    <DropDown
                        title={area ? area : "Area"}
                        values={areas ? areas : []}
                        handleSelect={handleAreaSelect}
                        status={!district}
                    />
                </div>
                {/* <Button
                    size="lg"
                    variant="success"
                    type="submit"
                    className="col-sm mb-2 mx-3"
                >
                    Search
                </Button> */}
            </div>
        </div>
    );
};

export default LocationDropDown;
