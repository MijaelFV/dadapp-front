import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import moment from 'moment'
import 'moment/locale/es'
import React, { useState } from 'react'
import { logType } from '../../../helpers/logType'

export const UserLogsTable = ({logs}) => {
    const createData = () => {
        return (
            logs.map((log, index) => (
                {
                    id: log.item?._id || index,
                    item: log.itemName,
                    space: log.space.name,
                    row: log.row,
                    column: log.column,
                    type: log.type,
                    date: log.time
                }
            ))
        )
    }
    const rows = createData()

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    // const [selected, setSelected] = useState([]);
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);

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

    // const isSelected = (name) => selected.indexOf(name) !== -1;
        
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const headCells = [
        { id: 'item', disablePadding: false, label: 'Articulo' },
        { id: 'space', disablePadding: false, label: 'Espacio' },
        { id: 'row', disablePadding: true, label: 'F' },
        { id: 'column', disablePadding: true, label: 'C' },
        { id: 'type', disablePadding: false, label: 'Tipo' },
        { id: 'date', disablePadding: false, label: 'Fecha' },
    ];

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
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
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((log) => {
                            const {logBgColor, labelType} = logType(log.type)

                            return (
                                <TableRow
                                    tabIndex={-1}
                                    // onClick={(event) => handleClick(event, log.id)}
                                >
                                    <TableCell>{log.item}</TableCell>
                                    <TableCell>{log.space}</TableCell>
                                    <TableCell padding="none">{log.row}</TableCell>
                                    <TableCell padding="none">{log.column}</TableCell>
                                    <TableCell><div className={`w-min p-1 rounded bg-opacity-40 ${logBgColor}`}>{labelType}</div></TableCell>
                                    <TableCell>{moment(log.date).locale("es").format('DD/MM/YY HH:mm')}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                    {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )} */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
