import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Dialog from '../../../Component/Modal/Dialog';
import { Button } from '@mui/material';
import styled from 'styled-components'
import { Container, Grid } from '@mui/material'
import axios from 'axios'
import CalendarWrite from './CalendarWrite';
const Box = styled.div` 
  border: 1px solid green;
  margin-top: 15%;
  height: 700px;
  text-align: center;
  border-radius: 5%;
  background: #f5faf5
`
function Calendar(props) {
    // console.log(props.user_num)
    // console.log(props.baby_num)
    const moment = require('moment');
    const [data, setData] = useState("")
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };
 
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        async function check() {
            const params = { baby_num: props.baby_num }
            await axios.get('http://localhost:8000/calendar', { params }).then(async (res) => {
                // console.log(res.data.result)
                const _data = await res.data.result.map((rowData) => (
                    {
                        number: rowData.calendar_num,
                        title: rowData.calendar_title,
                        content: rowData.calendar_content,
                        day: moment(rowData.calendar_date).format('YYYY-MM-DD'),
                    }
                ))
                setData(_data)
            })
        }
        check()
    }, []);
    // console.log(data.length)

    return (
        <Container sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        height={800}
                        customButtons={{
                            addButton: {
                                text: '추가하기',
                                click: function () {
                                    setOpen(true)
                                },
                            },
                        }}
                        headerToolbar={{
                            right: 'addButton',
                            left: 'prev,next today',
                            center: 'title',
                        }}
                        events={data ?
                            data.map(element => {
                                return (
                                    { title: element.title, date: element.day }
                                )
                            })
                            : <></>}
                        eventClick={handleClickOpen}
                        editable={true}
                        selectable={false}
                        selectMirror={true}
                        dayMaxEvents={true}
                        unselectAuto={true}
                    />
                    <Dialog
                        data={data}
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                        openPopup={open}
                    ><CalendarWrite {...props} onClose={handleClose}/>
                    </Dialog>

                </Grid>
            </Grid>
        </Container>
    );
}
export default Calendar;
