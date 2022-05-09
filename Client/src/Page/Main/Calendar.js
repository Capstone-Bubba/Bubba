import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from 'styled-components'
import { Container, Grid } from '@mui/material'

const Box = styled.div` 
  border: 1px solid green;
  margin-top: 15%;
  height: 700px;
  text-align: center;
  border-radius: 5%;
  background: #f5faf5
`
function Calendar() {
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
