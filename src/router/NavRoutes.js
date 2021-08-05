import React from "react";
import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { BottomNav } from "../components/Base/BottomNav";
import { AreaScreen } from "../pages/Area/AreaScreen";
import { MainScreen } from "../pages/Main/MainScreen";
import { SearchScreen } from "../pages/Search/SearchScreen";
import { SpaceInfo } from "../pages/Spaces/SpaceInfo";
import { SpaceScreen } from "../pages/Spaces/SpaceScreen";

export const NavRoutes = () => {

    const activeArea = useSelector(state => state.area.active);
    const isActiveArea = () => {
        if (activeArea) {
            return [
                <Route exact path="/spaces" component={SpaceScreen}/>,
                <Route exact path="/search" component={SearchScreen}/>,
                <Route exact path="/space/:spaceId" component={SpaceInfo} />,
                <Route exact path="/" component={MainScreen}/>
            ]
        } else {
            return <Route exact path="/" component={AreaScreen}/>
        }
    }

    return (
        <> 
            <Switch>
                {isActiveArea()}
                <Redirect to={"/"} />
            </Switch>
            <BottomNav isActiveArea={activeArea}/>
        </>
    )
}
