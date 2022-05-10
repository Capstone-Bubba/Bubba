import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

function NoticeTable({ data }) {
    return (
        <div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' color='red'>번호</TableCell>
                            <TableCell align='center'>제목</TableCell>
                            <TableCell align='center'>내용</TableCell>
                            <TableCell align='center'>글삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(element => {
                            return (
                                <ul>
                                    <li>
                                        {element.number}
                                    </li>
                                    <li>
                                        {element.title}
                                    </li>
                                    <li>
                                        {element.author}
                                    </li>
                                    <li>
                                        {element.day}
                                    </li>
                                </ul>
                            )


                        })}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default NoticeTable
