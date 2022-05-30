import React from 'react'
import { Button, CircularProgress, TextField, FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material'
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
    const [name, setName] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [content, setContent] = React.useState('');
    const [picture, setPicture] = React.useState('');
    const good = () =>{
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
            await axios.post('http://localhost:8000/calendar/create', formData,{params});
            alert("캘린더 추가");
        }
        else {
            alert("전부 입력하세요")
        }
    }

    return (
        <Layout>
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
            <div>
                <Button sx={{mt:5}}variant="contained" onClick={sendImageToServer}>
                    등록하기
                </Button>
               
            </div>
        </Layout>

    )
}


export default CalendarWrite