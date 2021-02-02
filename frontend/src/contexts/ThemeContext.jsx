import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  // componentDidMount
  useEffect(() => {
    const json = sessionStorage.getItem("theme");
    const localTheme = JSON.parse(json);

    if (localTheme != null) setIsLightTheme(localTheme);
  }, []);

  // componentDidUpdate
  useEffect(() => {
    const json = sessionStorage.getItem("theme");
    const localTheme = JSON.parse(json);

    if (localTheme !== isLightTheme)
      sessionStorage.setItem("theme", JSON.stringify(isLightTheme));
  }, [isLightTheme]);

  const theme = {
    light: {
      syntax:         "",
      bg:             "#ffffff",
      link:           " link",
      ui:             " bg-light",
      border:         " custom-border",
      custom_text:    " text-main",
      type:           "main",
      dropdown_text:  " dropdown-text",
      borderLeft:     " #eee",
      currency_text:  " text-success",
      success:        "success",
    },
    dark: {
      syntax:         " text-white",
      bg:             "#20222b",
      link:           " link-dark",
      ui:             " bg-dark",
      border:         " custom-border-dark",
      custom_text:    " text-main-dark",
      type:           "main-dark",
      dropdown_text:  " dropdown-text-dark",
      borderLeft:     " #cecece1f",
      currency_text:  " text-success-dark",
      success:        "success-dark",
    },
  };

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <ThemeContext.Provider value={{ isLightTheme, theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
