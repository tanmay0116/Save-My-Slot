import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table,message } from 'antd';
export default function DoctorAppointments() {

    const[appointments,setAppointments] = useState([]);
    const getAppointments=async()=>{
        try {
            const res = await axios.get('http://localhost:8080/doctor/doctor-appointments',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAppointments()
    },[])


    const handleStatus=async(record,status)=>{
            try {
                const res = await axios.post('http://localhost:8080/doctor/update-status',{appointmentsId:record._id,status},{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(res.data.success)
                {
                    message.success(res.data.message);
                    getAppointments();
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
                message.error('Something Went Wrong');
            }
    }

    const columns = [
        {
            title:'ID',
            dataIndex:'_id'
        },
        {
            title:`Patient's Name`,
            dataIndex:'name',
            render:(text,record)=>(
                <span>
                    {record.username}

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
        },
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    {record.status === 'pending' && (
                        <div className="d-flex">
                            <button className='btn btn-success' onClick={()=>handleStatus(record,'approved')}>Approve</button>
                            <button className='btn btn-danger ms-2' onClick={()=>handleStatus(record,'reject')}>Reject</button>
                        </div>
                    )}
                </div>
            )
        }
    ]
  return (
    <Layout>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}
