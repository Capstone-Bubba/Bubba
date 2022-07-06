import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material'
import axios from 'axios'
import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function NoticeDetail(props) {
    console.log(props)
    const { detailClose, detailPopup, value } = props;
    // const [data, setData] = useState(false)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [writer, setWriter] = useState('')
    const [content, setContent] = useState('')
    const [detail, setDetail] = useState(false);

    useEffect(() => {
        async function check() {
            await axios.get('http://localhost:8000/notice/detail', {
                params: { num: value }
            })
                .then((res) => {
                    setDetail(true);
                    setTitle(res.data.result[0].notice_title)
                    setDate(res.data.result[0].createAt)
                    setWriter(res.data.result[0].writer)
                    setContent(res.data.result[0].notice_content)
                })
        }
        check()
    }, [value])

    return (
        <>
            {detail ? <Layout>
                <Dialog
                    open={detailPopup}
                    onClose={detailClose}
                    aria-labelledby="notice-detail"
                    PaperProps={{ sx: { width: "40%", height: "100%" } }}
                >
                    <DialogTitle style={{ cursor: 'move', textAlign:'center' }} id="notice-detail" >
                    <div>
                                <h1>공지사항</h1>
                            </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           
                    <Divider/>
                            <div>
                                    <p> 제목 : {title}</p>
                                    <div >
                                        <p>작성자: {writer}</p>
                                        <p style={{textAlign:'right'}}>날짜 : {date}</p>
                                        <p>내용 : {content}</p>
                                    </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </Layout> : <></>}
        </>//fdsafdsafdas

    )
}

export default NoticeDetail
