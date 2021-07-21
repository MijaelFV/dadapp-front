import { faBox, faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { LoginScreen } from "../pages/Auth/LoginScreen";
import { RegisterScreen } from "../pages/Auth/RegisterScreen";
import { NavRoutes } from "./NavRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const logged = true

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={logged}/>
                <PublicRoute exact path="/register" component={RegisterScreen} isAuthenticated={logged}/>
                <PrivateRoute path="/" component={NavRoutes} isAuthenticated={logged}/>
            </Switch>
        </Router>
    )
}
