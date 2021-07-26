import React from "react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { BottomNav } from "../components/Base/BottomNav";
import { MainScreen } from "../pages/Main/MainScreen";
import { SearchScreen } from "../pages/Search/SearchScreen";
import { SpaceInfo } from "../pages/Spaces/SpaceInfo";
import { SpaceScreen } from "../pages/Spaces/SpaceScreen";

export const NavRoutes = () => {
    return (
        <> 
            <Switch>
                <Route exact path="/space/:spaceId" component={SpaceInfo} />
                <Route exact path="/spaces" component={SpaceScreen}/>
                <Route exact path="/search" component={SearchScreen}/>
                <Route exact path="/" component={MainScreen}/>
                <Redirect to={"/"} />
            </Switch>
            <BottomNav/>
        </>
    )
}
