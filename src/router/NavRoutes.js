import React from "react";
import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { AreaScreen } from "../pages/Area/AreaScreen";
import { MainScreen } from "../pages/Main/MainScreen";
import { SearchScreen } from "../pages/Search/SearchScreen";
import { SpaceInfoScreen } from "../pages/SpaceInfo/SpaceInfoScreen";
import { ItemInfoScreen } from "../pages/ItemInfo/ItemInfoScreen";
import { SpaceScreen } from "../pages/Spaces/SpacesScreen";
import { UserScreen } from "../pages/User/UserScreen";

export const NavRoutes = () => {

    const activeArea = useSelector(state => state.area.active);
    const isActiveArea = () => {
        if (activeArea) {
            return [
                <Route key={1} exact path="/item/:spaceId/:itemId" component={ItemInfoScreen}/>,
                <Route key={2} exact path="/space/:spaceId" component={SpaceInfoScreen} />,
                <Route key={3} exact path="/user/:userId" component={UserScreen}/>,
                <Route key={4} exact path="/spaces" component={SpaceScreen}/>,
                <Route key={5} exact path="/search" component={SearchScreen}/>,
                <Route key={6} exact path="/" component={MainScreen}/>
            ]
        } else {
            return <Route exact path="/" component={AreaScreen}/>
            // return <Route exact path="/" component={UserScreen}/>
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
