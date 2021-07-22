import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'

export const Navbar = () => {
    return (
        <div className="app-bar">
            <div className="app-bar-row">
                <div style={{width:"29px", height:"29px"}}></div>
                <TextField
                    placeholder="Buscar"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faSearch} style={{color:"grey"}}/>
                            </InputAdornment>
                        )
                    }}
                    variant="outlined"
                    size="small"
                />
                <Avatar
                    style={{backgroundColor:"#ffad4e", width:"29px", height:"29px"}}
                >
                    
                </Avatar>
            </div>
        </div>
    )
}
