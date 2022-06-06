import React, { useState } from 'react'
import { Button, CircularProgress, TextField, FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import "./Baby.scss"
import axios from 'axios'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ProfileImg from '../../images/defaultImg.png'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h2`
font-family: 'Gowun Dodum', sans-serif;
    text-align:center;
    color:black
`


function BabyForm() {
    const [name, setName] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const navigate = useNavigate()
    const handleChange = (event) => {
        setName(event.target.value);
    };
    const genderChange = (event) => {
        setGender(event.target.value);
    }

    const [image, setImage] = useState({
        image_file: "",
        preview_URL: ProfileImg
    });
    const [loaded, setLoaded] = useState(false);
    let inputRef
    const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();

        if (e.target.files[0]) {
            setLoaded("loading")
            fileReader.readAsDataURL(e.target.files[0])
        }
        fileReader.onload = () => {
            setImage(
                {
                    image_file: e.target.files[0],
                    preview_URL: fileReader.result
                }
            )
            setLoaded(true);
        }

    }
    const deleteImage = () => {
        setImage({
            image_file: "",
            preview_URL: ProfileImg,
        });
        setLoaded(false);
    }
    const sendImageToServer = async () => {
        if (image.image_file, name, value, gender) {
            const formData = new FormData()
            formData.append('file', image.image_file);
            formData.append('baby_name', name);
            formData.append('birth', value);
            formData.append('gender', gender);
            await axios.post('http://localhost:8000/baby/create', formData);
            alert("프로필 설정 완료");
            navigate('/home')

            setImage({
                image_file: "",
                preview_URL: ProfileImg,
            });
            setLoaded(false);
        }
        else {
            alert("전부 입력하세요")
        }
    }

    return (
        <div className="uploader-wrapper">
            <Title>프로필 설정</Title>
            <input type="file" accept="image/*"
                name='baby_picture'
                onChange={saveImage}
                ref={refParam => inputRef = refParam}
                style={{ display: "none" }}
            />
            <div className="img-wrapper">
                {loaded === false || loaded === true ? (
                    <img src={image.preview_URL} />
                ) : (
                    <CircularProgress className="img-spinner" tip="이미지 불러오는중" />
                )}
            </div>

            <div className="upload-button">
                <Button variant="contained" onClick={() => inputRef.click()}>
                    이미지 추가
                </Button>
                <Button variant="contained" onClick={deleteImage} color="error">
                    이미지 삭제
                </Button>
            </div>
            <TextField
                id="outlined-name"
                label="Name"
                value={name}
                defaultValue="Normal"
                onChange={handleChange}
                sx={{ mt: 5 }}
                name="baby_name"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    sx={{ mt: 5 }}
                    label="생년월일"
                    name="birth"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{ mt: 3 }} {...params} />}
                />
            </LocalizationProvider>
            <FormControl name="gender" sx={{ mt: 3 }} >
                <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={genderChange}
                >
                    <FormControlLabel value="0" control={<Radio />} label="남자" />
                    <FormControlLabel value="1" control={<Radio />} label="여자" />

                </RadioGroup>
            </FormControl>
            <div className="return-button">
                <Button variant="contained" onClick={sendImageToServer}>
                    프로필 설정
                </Button>
                <Button variant="contained" >
                    <Link style={{ textDecoration: 'none', color: '#fff' }} to="/home">홈으로 돌아가기</Link>
                </Button>
            </div>
        </div>

    )
}

export default BabyForm
