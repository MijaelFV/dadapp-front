import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../pages/Auth/LoginScreen";
import { RegisterScreen } from "../pages/Auth/RegisterScreen";
import { NavRoutes } from "./NavRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const {uid} = useSelector(state => state.auth) 
    
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid}/>
                <PublicRoute exact path="/register" component={RegisterScreen} isAuthenticated={!!uid}/>
                <PrivateRoute path="/" component={NavRoutes} isAuthenticated={!!uid}/>
            </Switch>
        </Router>
    )
}
