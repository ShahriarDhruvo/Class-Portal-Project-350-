import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Infobar = (props) => {
    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    const text_color = props.text ? " " + props.text : syntax;

    return (
        <div className="text-center">
            <h4
                className={"rounded p-3 shadow" + border + ui + text_color}
            >
                {props.children}
            </h4>
        </div>
    );
};

export default Infobar;
