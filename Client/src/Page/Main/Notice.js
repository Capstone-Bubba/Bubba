import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material'
import NoticeTable from '../../Component/Table/NoticeTable'


function Notice() {
  
  const [data, setData] = useState([]);
  useEffect(async () => {
    try{
      const res = await axios.get('http://localhost:8000/notice')
      const _data = await res.data.result.map ((rowData) =>(
        {
          number: rowData.notice_num,
          name: rowData.notice_title,
          author: rowData.writer,
          day: rowData.createAt,
     
        }
      )) 
      setData(data.concat(_data))
      console.log(data)
    } catch(e){
      console.error(e.message)
    }
  },[])
    // await axios.get('http://localhost:8000/notice')
    //     .then((res) => {
    //         // setData(response.read_notice_list.result);
    //         console.log(res.data.result)
    //     })
// }, []);

  return (
    <Container sx={{mt:3}}>
    <NoticeTable data={data}/>
    </Container>
  )
}

export default Notice