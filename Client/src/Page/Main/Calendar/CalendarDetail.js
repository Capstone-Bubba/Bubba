import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dialog, Table, DialogContent, DialogContentText, DialogTitle, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import styled from 'styled-components';
import moment from 'moment';
const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
function CalendarDetail(props) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [detail, setDetail] = useState(false);


    const { onClose, openPopup, value } = props;
    useEffect(() => {
        console.log(value)
        async function check() {
            await axios.get('http://localhost:8000/calendar/detail', {
                params: { baby_num: value }
            })
                .then((res) => {
                    setDetail(true);
                    setTitle(res.data.result[0].calendar_title)
                    setDate(moment(res.data.result[0].calendar_date).format("YYYY-MM-DD HH:mm:ss"))
                    setContent(res.data.result[0].calendar_content)
                })
        }
        check()
    }, [value])

    return (
        <Layout>
            <Dialog
                open={openPopup}
                onClose={onClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    일정 확인
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            display: 'inline-flex',
                            m: 1,
                            p: 1,
                            flexDirection: 'column'
                        }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{title}</TableCell>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{content}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                        <TableBody>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableBody>
                            </TableBody>
                        </Table>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <div>


            </div>
        </Layout>

    )
}


export default CalendarDetail