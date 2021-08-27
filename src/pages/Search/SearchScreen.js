import React from 'react'
import { faArrowLeft, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { makeStyles, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const SearchScreen = () => {

    const useStyles = makeStyles({
        cssOutlinedInput: {
            '&$cssFocused $notchedOutline': {
                borderColor: `transparent !important`
            },
            caretColor: "#ffad4e",
        },
        notchedOutline: {
            borderWidth: '1px',
            borderColor: 'transparent !important'
        }
    })
    const classes = useStyles();

    const history = useHistory()
    const handleReturnClick = () => {
        history.push("/home")
    }

    return (
        <div className="search-container">
            <div className="topBar">
                <div 
                    onClick={handleReturnClick}
                    className="topBar-back"
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                        className="topBar-icon"
                    />
                </div>
                <TextField
                    InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          notchedOutline: classes.notchedOutline
                        },
                    }}
                    placeholder="Buscar..."
                    size="small"
                    variant="outlined"
                    autoFocus="true"
                    className="topBar-searchField"
                />
                <div className="topBar-filter">
                    <FontAwesomeIcon 
                        // onClick={handleSearchClick}
                        icon={faSlidersH} 
                        className="topBar-icon"
                    />
                </div>
            </div>
        </div>
    )
}
