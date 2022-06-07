import React from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import axios from 'axios'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

function NoticeWrite(props) {
    const { onClose, openPopup } = props;
    const [notice_name, setName] = React.useState('');
    const [writer, setWriter] = React.useState('');
    const [notice_content, setContent] = React.useState('');
    const [day, setDay] = React.useState(null)

    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handlewChange = (event) => {
        setWriter(event.target.value);
    };
    const handleOnChange = (event) => {
        setContent(event.target.value);
    };

    const sendOnClickServer = async () => {
        if (notice_name, writer, notice_content) {
            // const formData = new FormData()
            const data = {
                "notice_title": notice_name,
                "notice_content": notice_content,
                "writer": writer
            }
            await axios.post('http://localhost:8000/notice/write', data);
            alert("노티스 추가!");
            onClose()
            window.location.reload();
            // console.log(formData)

        }
        else {
            alert("전부 입력하세요")
        }
    }

    return (
        <Layout>
            <Dialog
                open={openPopup}
                onClose={onClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={notice_name}
                            defaultValue="Normal"
                            onChange={handleChange}
                            sx={{ mt: 5 }}
                            name="notice_title"
                        />
                        <TextField
                            id="outlined-name"
                            label="Content"
                            value={notice_content}
                            defaultValue="Normal"
                            onChange={handleOnChange}
                            sx={{ mt: 3 }}
                            name="notice_content"
                        />
                        <TextField
                            id="outlined-name"
                            label="Writer"
                            value={writer}
                            defaultValue="Normal"
                            onChange={handlewChange}
                            sx={{ mt: 3 }}
                            name="writer"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mt: 5 }} variant="contained" onClick={sendOnClickServer}>
                        등록하기
                    </Button>
                </DialogActions>


            </Dialog>

            <div>


            </div>
        </Layout>

    )
}


export default NoticeWrite