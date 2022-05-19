import React, {useState,useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from 'styled-components'
import { Container, Grid } from '@mui/material'
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
  const [data, setData] = useState("")
  useEffect(() => {
      async function check() {
          await axios.get('http://localhost:8000/calendar').then((res) => {
              console.log(res.data.result)
              setData(res.data.result[0])
          })
      }
      console.log(data)
      check()
  }, [])
    return (
        <Container maxWidth={false} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        height={800}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: ''
                        }}
                        events={[{ title: 'event 1', date: '2022-05-05' },
                        { title: 'event 2', date: '2022-05-08' }]}
                        editable={true}
                        selectable={false}
                        selectMirror={true}
                        dayMaxEvents={true}
                        unselectAuto={true}
                    />
                </Grid>
            <Grid item xs={3}>
            <Box>
                <h1> 일정 상세</h1>
            </Box>
            </Grid>
            </Grid>

        </Container>
    );
}
export default Calendar;
