import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'
export default function Homepage() {
  const[doctors,setDoctors] = useState([])
  const getUserData=async()=>{
    try {
      const res = await axios.get('http://localhost:8080/getAllDoctors',{
        headers:{
          Authorization:"Bearer " + localStorage.getItem('token')
        }
      })
      if(res.data.success){
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUserData();
  },[])
  return (
    <Layout>
      <div>
      <h1 className='text-center'>Homepage</h1>
    <Row>
    {doctors && doctors.map(doctor=>(
      <DoctorList doctor={doctor}/>
    ))}
    </Row>
      </div>
    </Layout>
  )
}
