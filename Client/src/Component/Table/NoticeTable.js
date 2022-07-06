import React, { useState } from 'react'
import styled from 'styled-components';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter, TablePagination, } from '@material-ui/core';
import Button from '../Custom/Button';
import NoticeWrite from '../../Page/Main/Notice/NoticeWrite';
import NoticeDetail from '../../Page/Main/Notice/NoticeDetail';


function NoticeTable({ data }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = useState(false);
    const [read, setRead] = useState(false);
    const [value,setValue] = useState(0)
    console.log(data)
    // const number = data.map()
    const handleClickOpen = (e) => {
        setOpen(true);
    };
    const onRowClick = (id) => {
        console.log(id)
        setValue(id)
        setRead(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseEvent = (e) => {
        setRead(false);
    };

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
                <Button onClick={handleClickOpen}>작성하기</Button>
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
                                    <TableRow key={element} onRowClick={onRowClick} style= {{cursor: 'pointer'}}>
                                        <TableCell onClick={()=>onRowClick(element.number)}>{element.number}</TableCell>
                                        <TableCell onClick={()=>onRowClick(element.number)}> {element.name}</TableCell>
                                        <TableCell align='center' onClick={()=>onRowClick(element.number)}>{element.author}</TableCell>
                                        <TableCell align='center' onClick={()=>onRowClick(element.number)}> {element.day}</TableCell>
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
                    <NoticeWrite
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                        openPopup={open} />
                    
                    {value?<NoticeDetail
                        detailClose={handleCloseEvent}
                        detailPopup={read}
                        aria-labelledby="notice-detail"
                        value={value}/>:<></>}
                    

                </Table>


            </div>
        </div>
    )
}

export default NoticeTable
