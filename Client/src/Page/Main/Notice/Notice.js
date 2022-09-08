import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material'
import NoticeTable from '../../../Component/Table/NoticeTable'

axios.defaults.withCredentials = true;

function Notice(props) {
  const moment = require('moment');
  
  const [data, setData] = useState([]);
  useEffect(() => {
    async function check() {
    try{
      const res = await axios.get('http://localhost:8000/notice')
      const _data = await res.data.result.map ((rowData) =>(
        {
          number: rowData.notice_num,
          name: rowData.notice_title,
          author: rowData.writer,
          day: moment(rowData.createAt).format('YYYY년 MM월 DD일'),
        }
      )) 
      setData(data.concat(_data))
    } catch(e){
      console.error(e.message)
    }
  }
  check()
  },[])
  // console.log(data)

  return (
    <Container sx={{mt:3}}>
    <NoticeTable data={data}/>
    </Container>
  )
}

export default Notice