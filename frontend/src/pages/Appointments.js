import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd';
export default function Appointments() {

    const[appointments,setAppointments] = useState([]);
    const getAppointments=async()=>{
        try {
            const res = await axios.get('http://localhost:8080/user-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data);
                // console.log(res.data.data + 'Hello');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAppointments()
    },[])

    const columns = [
        {
            title:'ID',
            dataIndex:'_id'
        },
        {
            title:`Doctor's Name`,
            dataIndex:'name',
            render:(text,record)=>(
                <span>
                     {record.doctorfirstname} {record.doctorlastname}
                </span>
            )
        },
        {
                title:'Contact',
                dataIndex:'phone',
                render:(text,record)=>(
                    <span>
                        {record.phone} 
                    </span>
                )
        },
        {
            title:'Date & Time',
                dataIndex:'date',
                render:(text,record)=>(
                    <span>
                        {record.date}
                        &nbsp;
                        {record.time} 
                    </span>
                )
        },
        {
            title:'Status',
            dataIndex:'status'
        }
    ]

  return (
    <Layout>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}
