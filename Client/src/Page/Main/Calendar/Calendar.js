import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from 'styled-components'
import { Container, Grid } from '@mui/material'
import axios from 'axios'
import CalendarWrite from './CalendarWrite';
import CalendarDetail from './CalendarDetail'
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
    const [detail, setDetail] = useState(false);
    const [read, setRead] = useState(false);

    const [value,setValue] = useState(0)


    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const onRowClick = (id) => {
        setValue(id)
        console.log(value.event.id)
        setDetail(true);
    };
   
    const handleClose = () => {
        setOpen(false);
    };
    const detailOpen = () => {
        setDetail(true);
    };
    const detailClose = () => {
        setDetail(false)
    };
    useEffect(() => {
        async function check() {
            const params = { baby_num: props.baby_num }
            await axios.get('http://localhost:8000/calendar', { params }
            ).then(async (res) => {
                const _data = await res.data.result.map((rowData) => (
                    {
                        number: rowData.calendar_num,
                        title: rowData.calendar_title,
                        content: rowData.calendar_content,
                        day: moment(rowData.calendar_date).format('YYYY-MM-DD HH:mm:ss'),
                        color : rowData.color
                    }
                ))
                console.log(_data)
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
                                { id:element.number,title: element.title, date: element.day, color:element.color }
                                    
                                )
                            })
                            : <></>}
                        id={data.number}
                        eventClick={onRowClick}
                        editable={true}
                        selectable={false}
                        selectMirror={true}
                        dayMaxEvents={true}
                        unselectAuto={true}
                    />
                    <CalendarWrite {...props}
                        data={data}
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                        openPopup={open} />
                {value?
                  <CalendarDetail
                        data={data}
                        onClose={detailClose}
                        aria-labelledby="draggable-dialog-title"
                        openPopup={detail}
                        value = {value.event.id} />
                        :<></>}
                </Grid>
            </Grid>
        </Container>
    );
}
export default Calendar;
