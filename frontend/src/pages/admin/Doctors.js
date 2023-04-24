import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Button, Table, message } from 'antd';
export default function Doctors() {
  const[doctors,setDoctors] = useState([]);

  const getDoctors=async()=>{
    try {
      const res = await axios.get('http://localhost:8080/admin/getAllDoctors',{headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }})
      if(res.data.success)
      {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount=async(record,status)=>{
    try {
      const res = await axios.post('http://localhost:8080/admin/deleteAccount',{doctorId:record._id,userId:record.userId,status:status},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if(res.data.success)
      {
        message.success(res.data.message);
      }else{
        message.error('Something went wrong!');
      }
      window.location.reload();
    } catch (error) {
      message.error('Something Went Wrong!')
    }
  }



  const handleAccountStatus=async(record,status)=>{
    try {
      const res = await axios.post('http://localhost:8080/admin/changeAccountStatus',{doctorId:record._id,userId:record.userId ,status:status},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success)
      {
        message.success(res.data.message);
        window.location.reload()
      }
    } catch (error) {
      message.error('Something Went Wrong!')
    }
  }
const columns = [
  {
    title:'Name',
    dataIndex:'name',
    render:(text,record)=>(
      <span>{record.firstName} {record.lastName}</span>
    )
  },
  {
    title:'Status',
    dataIndex:'status'
  },
  {
    title:'Phone',
    dataIndex:'phone'
  },
  {
    title:'Actions',
    dataIndex:'actions',
    render:(text,record)=>(
      <div className="d-flex">
        {record.status==='pending' ? 
        <button className='btn btn-success' onClick={()=>{handleAccountStatus(record,'approved')}}>Approve</button> :
        <button className='btn btn-danger' onClick={()=>deleteAccount(record,'reject')}>Reject</button>  
      }
      </div>
    )
  }
]

  useEffect(()=>{getDoctors()},[]);
  return (
    <Layout>
      <h1>All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}
