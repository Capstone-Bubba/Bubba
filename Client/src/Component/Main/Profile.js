import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Photo from '../Photo/Photo'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Typography } from '@mui/material';

const Layout = styled.div`
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
`
const Text = styled.div`
    margin-top:2%;
    font-size: 13px;
`
function Profile({}) {
    const [data, setData] = useState("")
    let photos = ""
    const navigate = useNavigate()
    try {
        useEffect(() => {
            async function check() {
                await axios.get('http://localhost:8000/baby').then((res) => {
                    console.log('Profile')
                    setData(res.data.result[0])
                })
            }
            check()
        }, []);
        photos = data.baby_picture
    } catch(err) {
        console.log(err)
        navigate('/baby')
    }

   
    // console.log(data)
    console.log(photos);
    return (
        <Layout>
            {data ?
            <>
            <Typography
                    align='center'
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    프로필 등록
                </Typography>
            <Photo
               photos={photos}
            />
            <Typography style={{marginTop: '3%'}} variant="body1" >이름 : {data.baby_name}</Typography>
            <Typography style={{marginTop: '3%'}} variant="body1" >생년월일 : {moment(data.birth).format('YYYY-MM-DD')}</Typography>
            <Button variant="contained" style={{marginTop:'5%', width:'150px',height:'40px',backgroundColor:'#3182ce'}}><Link style={{ textDecoration: 'none', color:'white',}} to="/baby">프로필 등록</Link></Button></>
            :
            <>Wait</>}
        </Layout>
    )
}
export default {Profile};
// export default Profile;
