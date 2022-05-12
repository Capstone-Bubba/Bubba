import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter, TablePagination, } from '@material-ui/core';

function NoticeTable({ data }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <div>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    공지사항
                </Typography>
                <Table aria-aria-label='공지사항'>

                    <TableHead>
                        <TableRow>
                            <TableCell >번호</TableCell>
                            <TableCell >제목</TableCell>
                            <TableCell align='center'>작성자</TableCell>
                            <TableCell align='center'>날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map(element => {
                                return (
                                    <TableRow key={element}>
                                        <TableCell>{element.number}</TableCell>
                                        <TableCell> {element.name}</TableCell>
                                        <TableCell align='center'>{element.author}</TableCell>
                                        <TableCell align='center'> {element.day}</TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={data.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}

export default NoticeTable
