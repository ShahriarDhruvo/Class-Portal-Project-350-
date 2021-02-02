import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Title = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;

    return (
        <span
            className={custom_text}
            style={{ fontWeight: "600" }}
        >
            {props.children}
        </span>
    );
};

export default Title;
