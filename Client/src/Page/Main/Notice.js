import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material'
import NoticeTable from '../../Component/Table/NoticeTable'


function Notice() {
  
  const [data, setData] = useState([]);
  console.log(data)
  useEffect(async () => {
    await axios.get('http://localhost:8000/notice')
        .then((response) => {
            setData(response.read_notice_list.result);
            console.log(response.read_notice_list.result)
        })
}, []);

  return (
    <Container sx={{mt:3}}>
    <NoticeTable/>
    </Container>
  )
}

export default Notice