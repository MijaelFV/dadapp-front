import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { logType } from '../../../helpers/logType'
import { startLoadingLogs } from '../../../redux/actions/log'

export const ItemLogsTable = ({itemid, isLoading}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(startLoadingLogs(itemid, 2, null, page, rowsPerPage));
    }, [dispatch, itemid, page, rowsPerPage])
    const logs = useSelector(state => state.log.itemLogs);
    const totalPages = useSelector(state => state.log.totalPages)
    
    const createData = () => {
        return (
            logs.map((log) => (
                {
                    id: log.uid,
                    userid: log.user._id,
                    spaceid: log.space._id,
                    username: log.user.name,
                    row: log.row || null,
                    column: log.column || null,
                    quantity: log.quantity || null,
                    type: log.type,
                    date: log.time
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

    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
      };
        
    const handleUserClick = async(userid) => {
        if (userid) {
            history.push(`/user/${userid}`)
        }
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const emptyRows = rowsPerPage - rows.length

    const headCells = [
        { id: 'username', disablePadding: false, label: 'Usuario' },
        { id: 'row', disablePadding: true, label: 'F' },
        { id: 'column', disablePadding: true, label: 'C' },
        { id: 'type', disablePadding: false, label: 'Tipo' },
        { id: 'date', disablePadding: false, label: 'Fecha' },
    ];

    return (
        <>
            <TableContainer>
                {
                    isLoading === true
                    ?   <LinearProgress />
                    :   null 
                }
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
                    <TableBody >
                        {
                            stableSort(rows, getComparator(order, orderBy))
                            .map((log, index) => {
                                const {logBgColor, labelType} = logType(log.type)

                                return (
                                    <TableRow
                                        key={log.id}
                                        tabIndex={-1}
                                    >
                                        <TableCell><span className="cursor-pointer no-tap-highlight" onClick={() => handleUserClick(log.userid, log.spaceid)}>{log.username}</span></TableCell>
                                        <TableCell padding="none">{log.row}</TableCell>
                                        <TableCell padding="none">{log.column}</TableCell>
                                        <TableCell><div className={`w-min p-1 rounded bg-opacity-40 whitespace-nowrap ${logBgColor}`}>{labelType} {log.quantity !== null ? `(${log.quantity})` : ''}</div></TableCell>
                                        <TableCell>{moment(log.date).locale("es").format('DD/MM/YY HH:mm')}</TableCell>
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
