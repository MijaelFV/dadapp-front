import { faSignInAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pagination, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, LinearProgress } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getInventoryBySpace, startDeleteItem } from '../../../redux/actions/inv'
import { SwalMixin } from '../../../components/SwalMixin'

export const ItemsTable = ({spaceid, row, column}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const areaId = useSelector(state => state.area.active.uid);
    const isLoading = useSelector(state => state.ui.isLoading)

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('expiryDate');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(15);

    useEffect(() => {
        dispatch(getInventoryBySpace(spaceid, page, rowsPerPage, row, column));
        setSelected([])
    }, [dispatch, spaceid, page, rowsPerPage, row, column])
    useEffect(() => {
        setPage(1)
        setSelected([])
    }, [row, column])
    const items = useSelector(state => state.inv.items);
    const totalPages = useSelector(state => state.inv.totalPages)

    const createData = () => {
        return (
            items.map((item) => (
                {
                    id: item.uid,
                    name: item.name,
                    category: item.category?.name,
                    row: item.row,
                    column: item.column,
                    takedBy: item.takedBy !== null ? item.takedBy.name : null,
                    takedDate: item.takedDate !== null ? item.takedDate : null,
                    expiryDate: item.expiryDate !== null ? item.expiryDate : null,
                    quantity: item.quantity !== null ? item.quantity : null
                }
            ))
        )
    }
    const rows = createData()

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
      };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleOpenItemInfo = () => {
        const itemid = selected[0];
        history.push(`/item/${spaceid}/${itemid}`)
    };

    const handleDeleteItem = () => {
        SwalMixin.fire({
            text: "¿Estas seguro de eliminar el o los articulos seleccionados?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                selected.forEach((item) => (
                    dispatch(startDeleteItem(item, areaId))
                ))
                setSelected([])
            }
        })
    }

    const emptyRows = rowsPerPage - rows.length

    const headCells = [
        { id: 'name', disablePadding: true, label: 'Nombre' },
        { id: 'category', disablePadding: false, label: 'Categoria' },
        { id: 'row', disablePadding: true, label: 'F' },
        { id: 'column', disablePadding: true, label: 'C' },
        { id: 'quantity', disablePadding: false, label: 'Cantidad' },
        { id: 'expiryDate', disablePadding: false, label: 'Vencimiento' },
        { id: 'takedBy', disablePadding: false, label: 'Portador' },
        { id: 'takedDate', disablePadding: false, label: 'Retirado' },
    ];

    return (
        <>
            <Toolbar className="flex">
                {selected.length > 0 ? (
                    <h3 className={(selected.length > 0) ? "mr-auto" : null}>
                        {selected.length} Seleccionados
                    </h3>
                ) : (
                    <h1 id="tableTitle" className="mr-auto text-xl">Articulos</h1>
                )}
                {selected.length > 1 ? (
                    <IconButton 
                        onClick={handleDeleteItem}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </IconButton>
                ) : selected.length === 1 ? (
                    [<IconButton 
                        onClick={handleOpenItemInfo}
                    >
                        <FontAwesomeIcon icon={faSignInAlt}/>
                    </IconButton>,
                    <IconButton 
                        onClick={handleDeleteItem}
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </IconButton>]
                ) : null}
            </Toolbar>
            {
                isLoading === true
                ? <LinearProgress />
                : null
            }
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    aria-label="table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < rows.length}
                                    checked={rows.length > 0 && selected.length === rows.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            stableSort(rows, getComparator(order, orderBy))
                            .map((item, index) => {
                                const isItemSelected = isSelected(item.id);
                                const labelId = `table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        role="checkbox"
                                        onClick={(event) => handleClick(event, item.id)}
                                        key={item.id}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                        style={item.takedDate !== null ? {backgroundColor:"#321A24"} : null || item.quantity === 0 ? {backgroundColor:"#302120"} : null}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {item.name}
                                        </TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell padding="none">{item.row}</TableCell>
                                        <TableCell padding="none">{item.column}</TableCell>
                                        <TableCell >{item.quantity}</TableCell>
                                        <TableCell>{item.expiryDate && moment.utc(item.expiryDate).locale("es").format('DD/MM/YY')}</TableCell>
                                        <TableCell>{item.takedBy}</TableCell>
                                        <TableCell>{item.takedDate}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 41 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex justify-center my-2">
                <Pagination count={totalPages} size="small" page={page} onChange={handleChangePage} hidden={totalPages < 2} />
            </div>
        </>
    )
}
