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
    const [name, setName] = React.useState('');
    const [writer, setWriter] = React.useState('');
    const [content, setContent] = React.useState('');
    const [value, setValue] = React.useState(null)

    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handlewChange = (event) => {
        setWriter(event.target.value);
    };
    const handleOnChange = (event) => {
        setContent(event.target.value);
    };

    const sendImageToServer = async () => {
        if (name, writer, content, value) {
            const formData = new FormData()
            formData.append('notice_title', name);
            formData.append('notice_content', content);
            formData.append('writer', writer)
            formData.append('createAt', value);
            await axios.post('http://localhost:8000/notice/write', formData);
            alert("노티스 추가!");
            onClose()
            window.location.reload();

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
                            value={name}
                            defaultValue="Normal"
                            onChange={handleChange}
                            sx={{ mt: 5 }}
                            name="notice_title"
                        />
                        <TextField
                            id="outlined-name"
                            label="Content"
                            value={content}
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
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                sx={{ mt: 5 }}
                                label="Date"
                                name="calendar_date"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ mt: 3 }} {...params} />}
                            />
                        </LocalizationProvider>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ mt: 5 }} variant="contained" onClick={sendImageToServer}>
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