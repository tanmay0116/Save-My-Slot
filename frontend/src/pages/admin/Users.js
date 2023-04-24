import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd';
export default function Users() {
  const[users,setUsers] = useState([]);


  const deleteUserAccount=async(record)=>{
    try {
      const res = await axios.post('http://localhost:8080/admin/delete-user-account',{candidateId:record._id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if(res.data.success)
      {
        message.success('User Account successfully Deleted!');
      }else{
        message.error('Something went wrong');
      }
      window.location.reload();
    } catch (error) {
      message.error('Something went wrong!');
    }
  }



  const getUsers=async()=>{
    try {
      const res = await axios.get('http://localhost:8080/admin/getAllUsers',{headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }})
      if(res.data.success)
      {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //antD table column
  const columns=[
    {
      title:'Name',
      dataIndex:'name'
    },
    {
      title:'Email',
      dataIndex:'email'
    },
    {
      title:'Doctor',
      dataIndex:'isDoctor',
      render:(text,record)=>(
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>(
        <div className="d-flex">
          <button className='btn btn-danger' onClick={()=>deleteUserAccount(record)}>Delete Account</button>
        </div>
      )
    }
  ]
  useEffect(()=>{
    getUsers()
  },[])
  return (
    <Layout>
      <h1 className='text-center m-3'>All users</h1>
      <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}
