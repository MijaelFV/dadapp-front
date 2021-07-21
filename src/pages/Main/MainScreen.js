import { faArchive, faMinus, faPlus, faSearch, faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withStyles, Avatar, Button, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core'
import logo from '../../assets/tool.svg'
import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const MainScreen = () => {

    const StyledButton = withStyles({
        root: {
            background: "white",
            height: 35,
        //   boxShadow: '0px 0px 0px 0px'
            boxShadow: "rgb(240, 240, 240) 0px 0px 10px 0px",

        },
        label: {
            textTransform: 'capitalize',
            color: 'black'
        },
    })(Button);

    const createData = (name, object, row, column, space, type, className) => {
        return { name, object, row, column, space, type, className};
      }
    const history = [
        createData('Horacio', 'Martillo', 2, 3, 'Box1', 'Retiro', 'remove'),
        createData('Matias', 'Amoladora', 3, 1, 'Box2', 'Devolvio', 'add'),
        createData('Marcos', 'Destornillador', 2, 3, 'Box1', 'Retiro', 'remove'),
        createData('Matias', 'Amoladora', 3, 2, 'Box2', 'Retiro', 'remove'),
        createData('Horacio', 'Cinta metrica', 1, 2, 'Box1', 'Devolvio', 'add'),
        createData('Matias', 'Nivel', 1, 5, 'Box2', 'Retiro', 'remove')
    ]
 
    return (
        <div className="main-container">
            {/* <div className="app-bar">
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
            </div> */}
            <h1 style={{marginTop:"40px", color:"#616161"}}>
                Taller de Horacio
            </h1>
            <div className="dashboard">
                <div className="dash-card-column">
                    <div className="dash-card" style={{backgroundColor:"#C8FACD", color:"#00e817"}}>
                        <FontAwesomeIcon icon={faPlus} className="dash-icon"/>
                    </div>
                    <p className="dash-card-label">
                        Devolver
                    </p>
                </div>
                <div className="dash-card-column">
                    <div className="dash-card" style={{backgroundColor:"#FFF7CD", color:"#ffd600"}}>
                        <h1 className="m-0" style={{fontSize:"30px"}}>
                            0
                        </h1>
                    </div>
                    <p className="dash-card-label">
                        Pendientes
                    </p>
                </div>
                <div className="dash-card-column">
                    <div className="dash-card" style={{backgroundColor:"#F2C2BB", color:"#FF3535"}}>
                        <FontAwesomeIcon icon={faMinus} className="dash-icon"/>
                    </div>
                    <p className="dash-card-label">
                        Retirar
                    </p>
                </div>
            </div>
            <div className="log">
                <p className="log-title">Movimientos</p>
                <Table>
                    <TableHead>
                        <TableCell align="center">Usuario</TableCell>
                        <TableCell align="center">Objeto</TableCell>
                        <TableCell align="center">F</TableCell>
                        <TableCell align="center">C</TableCell>
                        <TableCell align="center">Espacio</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                    </TableHead>
                    <TableBody>
                        {history.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.object}</TableCell>
                                <TableCell align="center">{row.row}</TableCell>
                                <TableCell align="center">{row.column}</TableCell>
                                <TableCell align="center">{row.space}</TableCell>
                                <TableCell align="center"><span className={row.className}>{row.type}</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
