import React from 'react'
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TextareaAutosize } from '@mui/material'
import Button from '@mui/material/Button';
import axios from 'axios'
import { makeStyles } from '@mui/styles';
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
const useStyles = makeStyles({
    dialogPaper: {
        minWidth: '30vw',
        minHeight: '50vh',
    },

});


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
        <Dialog
            open={openPopup}
            onClose={onClose}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle sx={{
                textAlign: 'center',
                fontSize: '1.5rem',
                display: 'flex',
                flexDirection: 'column'
            }} style={{ cursor: 'move' }} id="draggable-dialog-title">
                작성하기
            </DialogTitle>
            <DialogContent

            >
                <DialogContentText
                    sx={{
                        p: 5,
                        m: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                        flexDirection: 'column',
                    }}>
                    <TextField
                    sx={{width: 400,}}
                        variant="outlined"
                        id="outlined-name"
                        label="Name"
                        value={notice_name}
                        onChange={handleChange}
                        name="notice_title"
                    />
                    <TextField
                        sx={{ mt: 5, width: 400 ,}}
                        variant="outlined"
                        id="outlined-name"
                        label="Writer"
                        value={writer}
                        onChange={handlewChange}
                        name="writer"
                    />
                    <TextField
                       variant="outlined"
                       id="outlined-name"
                       multiline
                       label="Content"
                       value={notice_content}
                       onChange={handleOnChange}
                        minRows={5}
                        placeholder="Content"
                        sx={{ mt: 5, width: 400 ,}}
                    />
                
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}

            >
                <Button variant="outlined" onClick={sendOnClickServer}>
                    등록하기 //test
                </Button>
            </DialogActions>
        </Dialog>

    )
}


export default NoticeWrite