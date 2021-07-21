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
import { MainScreen } from "../pages/Main/MainScreen";
import { SpaceScreen } from "../pages/Spaces/SpaceScreen";

export const NavRoutes = () => {

    return (
        <>
            <Switch>
                <Route exact path="/login" component={LoginScreen}/>
                <Route exact path="/register" component={RegisterScreen}/>
                <Route exact path="/spaces" component={SpaceScreen}/>
                <Route exact path="/" component={MainScreen}/>
                <Redirect to={"/"} />
            </Switch>
            <BottomNavigation style={{position:"fixed", bottom:"0px", left:"0px", right:"0px"}}>
                <BottomNavigationAction component={Link} to="/" showLabel={false} label="Inicio" icon={<FontAwesomeIcon icon={faHome}/>}/>
                <BottomNavigationAction showLabel={false} label="Buscar" icon={<FontAwesomeIcon icon={faSearch}/>}/>
                <BottomNavigationAction component={Link} to="/spaces"showLabel={false} label="Espacios" icon={<FontAwesomeIcon icon={faBox}/>}/>
                <BottomNavigationAction showLabel={false} label="Perfil" icon={<FontAwesomeIcon icon={faUser}/>}/>
            </BottomNavigation>
        </>
    )
}
