import React, {useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import moment from 'moment'
import { DatePicker, TimePicker, message } from 'antd'
import { Alert} from 'antd';
export default function BookingPage() {
  const {user} = useSelector(state=>state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const[doctors,setDoctors] = useState()
    const[date,setDate] = useState();
    const[time,setTime]=useState();
    const[isAvailable,setIsAvailable] = useState(false);
    const[alert,setAlert] = useState(false);
    const handleBooking=async()=>{
      try {
        setIsAvailable(true);
        if(!date || !time)
        {
          
          return setAlert(true);
          
        }
        setAlert(false);
        dispatch(showLoading())
        const res = await axios.post('http://localhost:8080/book-appointment',{doctorId:params.doctorId,userId:user._id,doctorInfo:doctors,date:date,userInfo:user,time:time,username:user.name,doctorfirstname:doctors.firstName,doctorlastname:doctors.lastName,phone:doctors.phone},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        dispatch(hideLoading())
        if(res.data.success)
        {
          message.success(res.data.message);
          // console.log(res.data.success)
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log('error');
      }
    }


  const getUserData=async()=>{
    try {
      const res = await axios.post('http://localhost:8080/doctor/getDoctorById',{doctorId:params.doctorId},{
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

  const handleAvailability=async()=>{
      try {
        dispatch(showLoading());
        const res = await axios.post('http://localhost:8080/booking-availability',{doctorId:params.doctorId,date,time},{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        dispatch(hideLoading());
        if(res.data.success){
          setIsAvailable(true);
          message.success(res.data.message);
          // window.location.reload();
        }
        else{
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
  }

  useEffect(()=>{
    getUserData();
    //eslint-disable-next-line
  },[])
  // console.log(doctors.timings[1])
  return (
    <Layout>
      <h3 style={{marginLeft:`43%`}}>Booking Page</h3>
        <div className="container m-2">
            {doctors && (
                <div>
                    <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                    <h4>Fees : {doctors.feesPerConsulatation}</h4>
                    <h4>Timings : {doctors.timings[0]} - {doctors.timings[1]}</h4>
                    <div className="d-flex flex-column w-50">
                      <DatePicker className='m-2' format='YYYY-MM-DD' onChange={(value)=>setDate(value.format("DD-MM-YYYY"))} />
                      <TimePicker className='m-2' format='HH:mm' onChange={(value)=>setTime(value.format("HH:mm"))} />
                     <div>
                     <button  className='btn btn-primary mt-2' onClick={handleAvailability}>Check Availability</button>
                      <button style={{marginLeft:'2em'}} className=' mt-2 btn btn-dark' onClick={handleBooking}>Book Now</button>            
                     </div>
                     {alert && (
                        <Alert style={{width:'80%',margin:'2rem'}}
                        message="Warning"
                        description="Please enter date and time to book your appointment"
                        type="warning"
                        showIcon
                      />
                      )}
                    </div>
                </div>
            )}
        </div>
    </Layout>
  )
}
