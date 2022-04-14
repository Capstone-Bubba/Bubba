import React from 'react'
import styled from 'styled-components'
import Table from '../../Component/Main/PushTable'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// import Table from '../../Component/Main/PushTable'
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 160,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, height: 120 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Layout = styled.div`
  display:grid;
  width:100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`
const Title = styled.div `
  margin-top: 8%;
  margin-left: 21%;
  background: white;
  text-align: left;
`
const Head = styled.div `
  height: 100px;
`
const Content = styled.div `
  margin-left: 20%;
  margin-right: 8%;
  position: relative;
  margin-bottom: 2%;

`
function Notice() {
  return (
   <Layout>
     <Head>
     <Title><h1 style={{margin:"0"}}>공지사항</h1></Title>
     </Head>
     <Content>
     <DataGrid
        style={{background:"white", height: "600px", }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[4]}
        // checkboxSelection
      />
     </Content>
   </Layout>
  )
}

export default Notice