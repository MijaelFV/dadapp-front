import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/es'
import React, { useState } from 'react'
import { StyTableRow } from '../../../styles/components/materialUi/styledComponents'

export const LogsTable = ({list}) => {

    const createData = () => {
        return (
            list.map((object) => (
                {
                    id: object.item._id,
                    user: object.user.name,
                    row: object.row,
                    column: object.column,
                    type: object.type,
                    time: object.time
                }
            ))
        )
    }
    const rows = createData()

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
    
    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         const newSelecteds = rows.map((n) => n.id);
    //         setSelected(newSelecteds);
    //         return;
    //     }
    //     setSelected([]);
    // };

    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1),
    //         );
    //     }

    //     setSelected(newSelected);
    // };

    const isSelected = (name) => selected.indexOf(name) !== -1;
        
        const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const headCells = [
        { id: 'user', label: 'Usuario' },
        { id: 'row', label: 'F' },
        { id: 'column', label: 'C' },
        { id: 'type', label: 'Tipo' },
        { id: 'time', label: 'Tiempo' },
    ];

    return (
        <div className="spaceItemsTable">
            <Toolbar className="toolBar">
                 <h2 className="toolBar-title">Movimientos</h2>
                <IconButton className="toolBar-icon">
                    <FontAwesomeIcon icon={faSearch}/>
                </IconButton>
            </Toolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
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
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((object) => {
                                return (
                                    <StyTableRow
                                        hover
                                        tabIndex={-1}
                                        // onClick={(event) => handleClick(event, object.id)}
                                    >
                                        <TableCell>{object.user}</TableCell>
                                        <TableCell>{object.row}</TableCell>
                                        <TableCell>{object.column}</TableCell>
                                        <TableCell>{object.type}</TableCell>
                                        <TableCell>{moment(object.time).locale("es").format('DD/MM/YY HH:mm')}</TableCell>
                                    </StyTableRow>
                                )
                            })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}