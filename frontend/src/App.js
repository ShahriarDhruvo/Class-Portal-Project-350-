import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import Home from "./pages/home";
import ServiceProviders from "./pages/serviceProviders";
import ShoppingCart from "./pages/shoppingCart";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserRegistration from "./pages/userRegistration";
import UserLogin from "./pages/userLogin";
import AuthenticationContextProvider from "./contexts/AuthenticationContext";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import TestPage from "./test/TestPage";

library.add(far, fas);

function App() {
    return (
        <Router>
            <AuthenticationContextProvider>
                <Switch>
                    <Route
                        path="/service-provider/:id"
                        component={ServiceProviders}
                    />
                    <Route exact path="/cart" component={ShoppingCart} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/registration"
                        component={UserRegistration}
                    />
                    <Route exact path="/login" component={UserLogin} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/test" component={TestPage} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthenticationContextProvider>
        </Router>
    );
}

export default App;
