import React from "react";
import MainNav from "./navbar";
import ThemeContextProvider from "../../contexts/ThemeContext";
import Main from "./main";

const Layout = (props) => {
    return (
        <ThemeContextProvider>
            <MainNav />
            <Main>{props.children}</Main>
        </ThemeContextProvider>
    );
};

export default Layout;
