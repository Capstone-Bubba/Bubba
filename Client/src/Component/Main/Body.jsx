import React from 'react'
import styled from 'styled-components'
import Profile from './Profile'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import Table  from 'material-table'
import PushTable from './PushTable'
// import PushTable from './PushTable'


// const columns: GridColDef = [
//   { field: 'id', headerName: 'ID', width: 130 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 160,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 110,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, height: 120 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-column-gap: 20px;
  margin-left: 300px;
  
`
const PushBox = styled.div`
  background: rgba(18,20,34, 0.1);
  box-shadow: 10px 5px 5px #C0C0C0;
  border-radius: 3%;
  height: 320px;
  padding:1px;
  

`
const MemberBox = styled.div`
  background: white;
  box-shadow: 10px 5px 5px #C0C0C0;
  height: 320px;
  margin-right: 20px;
  padding:1px;
  border-radius: 3%;
  text-align: center;
`

const Text = styled.h3`
  text-align: center;
`

function Body() {
  return (
    <BodyContainer>
    <PushBox> 
      {/* <DataGrid
        style={{borderRadius: "3%", height: "320px"}}
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
        // checkboxSelection
      /> */}
      </PushBox>
    <MemberBox><Profile/></MemberBox>
  </BodyContainer>
  )
}

export default Body