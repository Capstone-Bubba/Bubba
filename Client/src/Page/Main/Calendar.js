import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from 'styled-components'
import { Container, Grid } from '@mui/material'
import { Modal } from '@mui/material'
import axios from 'axios'
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
    useEffect(() => {
        async function check() {
            const params = { baby_num: props.baby_num }
            await axios.get('http://localhost:8000/calendar', { params }).then((res) => {
                // console.log(props.baby_num)
                console.log(res.data.result)
                // setData(res.data.result)
                const _data = res.data.result.map((rowData) => (
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
        console.log(data)
        check()
    }, []);
    console.log(data.length)
    // useEffect(() => {
    //     async function check() {
    //         const params = { baby_num: props.baby_num }
    //         try {
    //             const res = await axios.get('http://localhost:8000/calendar', { params })
    //             const _data = await res.data.result.map((rowData) => (
    //                 {
    //                     number: rowData.calendar_num,
    //                     title: rowData.calendar_title,
    //                     content: rowData.calendar_content,
    //                     day: moment(rowData.calendar_date).format('YYYY년 MM월 DD일'),
    //                 }
    //             ))
    //             setData(data.concat(_data))
    //             console.log(res.data.result)

    //         } catch (e) {
    //             console.error(e.message)
    //         }
    //     }
    //     check()
    // }, [])
    // const DataCheck = (data) => {
    //     console.log(DataCheck)
    //     data.map(element=>{
    //         console.log(element)
    //         return(
    //             {title:element.calendar_title, date:element.calendar_date}
    //         )
    //     })
    // }
    return (
        <Container sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        height={800}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                        }}
                        events={data ?
                            data.map(element => {
                                console.log(element)
                                return (
                                    { title: element.title, date: element.day }
                                )
                            })
                            : <></>}
                        editable={true}
                        selectable={false}
                        selectMirror={true}
                        dayMaxEvents={true}
                        unselectAuto={true}
                    />

                </Grid>
            </Grid>
        </Container>
    );
}
export default Calendar;
