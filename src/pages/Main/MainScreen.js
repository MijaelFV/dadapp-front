import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { openModal } from '../../actions/ui'
import { MainModal } from '../../components/Main/MainModal'

export const MainScreen = () => {

    const createData = (name, object, row, column, space, type, className) => {
        return { name, object, row, column, space, type, className};
      }
    const logs = [
        createData('Horacio', 'Martillo', 2, 3, 'Box1', 'Retiro', 'log-remove'),
        createData('Matias', 'Amoladora', 3, 1, 'Box2', 'Devolvio', 'log-add'),
        createData('Marcos', 'Destornillador', 2, 3, 'Box1', 'Retiro', 'log-remove'),
        createData('Matias', 'Amoladora', 3, 2, 'Box2', 'Retiro', 'log-remove'),
        createData('Horacio', 'Cinta metrica', 1, 2, 'Box1', 'Devolvio', 'log-add'),
        createData('Matias', 'Nivel', 1, 5, 'Box2', 'Retiro', 'log-remove')
    ]

    const history = useHistory()
    const dispatch = useDispatch();

    // const {spaces} = useSelector(state => state.space);
    // const {items} = useSelector(state => state.inv);

    // const logs = spaces || []
    
    // if (items !== null) {
    //     dispatch(deleteInventory());
    // }

    // useMemo(() => {
    //     if (!spaces) {
    //         dispatch(startLoadingSpaces());
    //     }
    // }, [dispatch, spaces])

    const handleSearchClick = () => {
        history.push("/search")
    }

    const handleAddClick = () => {
        dispatch(openModal());
    }
    
    const handleRemoveClick = () => {
        dispatch(openModal());
    }
 
    return (
        <div className="main-container">
            <div className="topBar">
                <div 
                    className="topBar-search"
                    onClick={handleSearchClick}
                >
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        className="topBar-icon"
                    />
                </div>
                <Avatar/>
            </div>
            <div className="area">
                <h3 className="area-label">
                    ÁREA
                </h3>
                <h1 className="area-name">
                    Taller de Horacio
                </h1>
            </div>
            <div className="board">
                <div className="board-column">
                    <div 
                        className="board-button-add"
                        onClick={handleAddClick}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="board-icon"
                        />
                    </div>
                    <p className="board-label">
                        Devolver
                    </p>
                </div>
                <div className="board-column">
                    <div className="board-button-pending">
                        <h1>
                            0
                        </h1>
                    </div>
                    <p className="board-label">
                        Pendientes
                    </p>
                </div> 
                <div className="board-column">
                    <div 
                        className="board-button-remove"
                        onClick={handleRemoveClick}
                    >
                        <FontAwesomeIcon 
                            icon={faMinus} 
                            className="board-icon"
                        />
                    </div>
                    <p className="board-label">
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
                        {logs.map((row) => (
                            <TableRow key={row.object+row.type}>
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
            <MainModal />
        </div>
    )
}
