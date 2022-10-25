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

function CalendarWrite(props) {
    const { onClose, openPopup } = props;
    const [name, setName] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [content, setContent] = React.useState('');
    const [picture, setPicture] = React.useState('');
    const good = () => {
        setPicture('')
    }
    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleOnChange = (event) => {
        setContent(event.target.value);
    };

    const sendImageToServer = async () => {
        if (name, value, content) {
            const params = { baby_num: props.baby_num }
            console.log(params)
            const formData = new FormData()
            formData.append('calendar_title', name);
            formData.append('calendar_date', value);
            formData.append('calendar_content', content);
            formData.append('calendar_picture', picture)
            await axios.post(`http://localhost:8000/calendar/create`, formData, { params : params });
            alert("캘린더 추가");
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
                    일정 추가
                </DialogTitle>
                <DialogContent>
                    <DialogContentText 
                    sx={{
                        display: 'inline-flex',
                        m: 1,
                        p: 1,
                        flexDirection: 'column'
                    }}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={name}
                            defaultValue="Normal"
                            onChange={handleChange}
                            sx={{ mt: 5 }}
                            name="calendar_title"
                        />
                        <TextField
                            id="outlined-name"
                            label="Content"
                            value={content}
                            defaultValue="Normal"
                            onChange={handleOnChange}
                            sx={{ mt: 3 }}
                            name="calendar_content"
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


export default CalendarWrite