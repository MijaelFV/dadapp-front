import React from 'react'
import { faHome, faPallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation, BottomNavigationAction, withStyles } from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNavValue } from '../redux/actions/ui';

export const BottomNav = ({isActiveArea}) => {
    const StyledNavBar = withStyles({
        root: {
            boxShadow: "rgb(240, 240, 240) 0px 0px 10px 0px",
        },
    })(BottomNavigation);

    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {navValue} = useSelector(state => state.ui)

    const handleChange = (e, newValue) => {
        dispatch(setNavValue(newValue))
    };
        
    if (pathname === "/search" || isActiveArea === null) {
        return null;
    } else {
        return (
            <>
                <StyledNavBar 
                    value={navValue}
                    onChange={handleChange}
                    style={{position:"fixed", bottom:"0px", left:"0px", right:"0px"}}
                >
                    <BottomNavigationAction 
                        component={Link} 
                        to="/" 
                        value="home"
                        label="Inicio"
                        icon={<FontAwesomeIcon icon={faHome}/>}
                    />
                    <BottomNavigationAction 
                        component={Link} 
                        to="/spaces"
                        value="spaces"
                        label="Espacios" 
                        icon={<FontAwesomeIcon icon={faPallet}/>}
                    />
                </StyledNavBar>
            </>
        )
    }

}
