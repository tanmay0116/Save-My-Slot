import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function NotificationPage() {
    const {user} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMarkAllRead=async()=>{
        try {
          dispatch(showLoading())
        const res = await axios.post('http://localhost:8080/get-all-notification',{userId:user._id},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        // window.location.reload();
        dispatch(hideLoading())
        window.location.reload();
        if(res.data.success)
        {
            message.success(res.data.message);
        }else{
            message.error(res.data.message);
        }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something Went Wrong!');
        }
    }
    const handleDeleteAllRead=async()=>{
        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            // window.location.reload();
            dispatch(hideLoading());
            window.location.reload();
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong in Notification');
        }
    }
  return (
    <Layout>
      <h4 className='p-3 text-center'>Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab='UnRead' key={0}>
            <div className="d-flex justify-content-end">
                <button className='btn btn-primary m-4' onClick={handleMarkAllRead} style={{cursor:'pointer'}}>Mark All Read</button>
            </div>
            {
                user?.notification.map(notificationmsg=>{
                    return(
                        <>
                        <div className="card" >
                        <div className="card-text" onClick={()=>navigate(notificationmsg.onClickPath)} style={{cursor:'pointer'}}>
                            <ul style={{listStyleType:'circle'}}>
                            <li>{notificationmsg.message}</li>
                            </ul>
                        </div>
                    </div>
                        </>
                    )
                })
            }
        </Tabs.TabPane>

        <Tabs.TabPane tab='Read' key={1}>
            <div className="d-flex justify-content-end">
                <button className='p-2 btn btn-primary m-4' style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</button>
            </div>
            {
                user?.seennotification.map(notificationmsg=>{
                    return(
                        <>
                        <div className="card" >
                        <div className="card-text" onClick={()=>navigate(notificationmsg.onClickPath)} style={{cursor:'pointer'}}>
                            <ul style={{listStyleType:'circle'}}>
                            <li>{notificationmsg.message}</li>
                            {console.log(notificationmsg.message)}
                            </ul>
                        </div>
                    </div>
                        </>
                    )
                })
            }
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}
