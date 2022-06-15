// import React from 'react'
// import { Dialog, Table, DialogContent, DialogContentText, DialogTitle, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
// import styled from 'styled-components';
// const Layout = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `
// function CalendarDetail(props) {
//     const { onClose, openPopup, data } = props;
//     console.log(data)
//     return (
//         <Layout>
//             <Dialog
//                 open={openPopup}
//                 onClose={onClose}
//                 aria-labelledby="draggable-dialog-title"
//             >
//                 <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
//                     일정 확인
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText
//                         sx={{
//                             display: 'inline-flex',
//                             m: 1,
//                             p: 1,
//                             flexDirection: 'column'
//                         }}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>제목</TableCell>
//                                     <TableCell>날짜</TableCell>
//                                     <TableCell>내용</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>

//                                 {data.map(element => {
//                                     return (
//                                         <TableBody>
//                                             <TableCell>{element.title}</TableCell>
//                                             <TableCell>{element.content}</TableCell>
//                                             <TableCell>{element.day}</TableCell>
//                                         </TableBody>
//                                     )
//                                 })}
//                             </TableBody>
//                         </Table>
//                     </DialogContentText>
//                 </DialogContent>
//             </Dialog>

//             <div>


//             </div>
//         </Layout>

//     )
// }


// export default CalendarDetail