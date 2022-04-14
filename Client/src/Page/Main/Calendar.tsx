import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from 'styled-components'

const Layout = styled.div `
  display: grid;
  margin-left: 15%;
  grid-template-columns:2fr 1fr;
  column-gap: 20px;
`
const CalendarLayout = styled.div `
  margin-top: 5%;

`
const Box = styled.div ` 
  border: 1px solid green;
  margin-top: 15%;
  height: auto;
  text-align: center;
  border-radius: 5%;
  background: #f5faf5
`
function Calendar() {
  return (
    <Layout>
      <CalendarLayout>
     <FullCalendar
        plugins={[ dayGridPlugin ]}
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
      </CalendarLayout>
      <Box>
        <h1> 일정 상세</h1>
      </Box>
    </Layout>
  )
}

export default Calendar
