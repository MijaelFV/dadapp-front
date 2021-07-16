import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { LoginScreen } from "../pages/Auth/LoginScreen";
import { RegisterScreen } from "../pages/Auth/RegisterScreen";
import { MainScreen } from "../pages/Main/MainScreen";

export const AppRouter = () => {

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginScreen}/>
                    <Route exact path="/register" component={RegisterScreen}/>
                    <Route exact path="/" component={MainScreen}/>
                    <Redirect to={"/"} />
                </Switch>
            </div>
        </Router>
    )
}
