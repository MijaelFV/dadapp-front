import { faSearch, faSignInAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { StyTableRow } from '../../../styles/components/materialUi/styledComponents'

export const ItemsTable = ({objectList, spaceId}) => {

    const createData = () => {
        return (
            objectList.map((object) => (
                {
                    id: object.item._id,
                    name: object.item.name,
                    category: object.item.category.name,
                    row: object.row,
                    column: object.column,
                    description: object.item.description
                }
            ))
        )
    }
    const rows = createData()

    const history = useHistory();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenItemInfo = () => {
        const itemId = selected[0];
        history.push(`/space/${spaceId}/${itemId}`)
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const headCells = [
        { id: 'name', disablePadding: true, label: 'Nombre' },
        { id: 'category', disablePadding: false, label: 'Categoria' },
        { id: 'row', disablePadding: false, label: 'F' },
        { id: 'column', disablePadding: false, label: 'C' },
        { id: 'description', disablePadding: false, label: 'Descripcion' },
    ];


    return (
        <div className="spaceItemsTable">
            <Toolbar className="toolBar">
                {selected.length > 0 ? (
                    <h3 className={(selected.length > 0) ? "toolBar-length-selected" : null}>
                        {selected.length} Seleccionados
                    </h3>
                ) : (
                    [<h2 id="tableTitle" className="toolBar-title">Objetos</h2>,
                    <IconButton className="toolBar-icon">
                        <FontAwesomeIcon icon={faSearch}/>
                    </IconButton>]
                )}
                {selected.length > 1 ? (
                    <IconButton className={(selected.length > 0) ? "toolBar-icon selected" : null}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </IconButton>
                ) : selected.length === 1 ? (
                    <IconButton 
                        className="toolBar-icon selected"
                        onClick={handleOpenItemInfo}
                    >
                        <FontAwesomeIcon icon={faSignInAlt}/>
                    </IconButton>
                ) : null}
            </Toolbar>
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
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((object, index) => {
                                const isItemSelected = isSelected(object.id);
                                const labelId = `table-checkbox-${index}`;

                                return (
                                    <StyTableRow
                                        hover
                                        tabIndex={-1}
                                        role="checkbox"
                                        onClick={(event) => handleClick(event, object.id)}
                                        key={object.id}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {object.name}
                                        </TableCell>
                                        <TableCell>{object.category}</TableCell>
                                        <TableCell>{object.row}</TableCell>
                                        <TableCell>{object.column}</TableCell>
                                        <TableCell>{object.description}</TableCell>
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
                rowsPerPageOptions={[10, 15, 20]}
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
