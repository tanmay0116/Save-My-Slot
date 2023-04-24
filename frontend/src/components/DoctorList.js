import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function DoctorList({doctor}) {
    const navigate = useNavigate();
  return (
    <>


    <div className="card m-2" style={{cursor:'pointer',boxShadow:'5px 10px #888888',backgroundColor:'black',color:'white'}}>
      <div className="card-body">
        <h4 className="card-title">Dr. {doctor.firstName} {doctor.lastName}</h4>
        <p className="card-text"><b>Specialization : </b> {doctor.specialization}</p>
        <p className="card-text"><b>Experience : </b> {doctor.experience}</p>
        <p className="card-text"><b>Fees-Per-Consulatation : </b> {doctor.feesPerConsulatation}</p>
        <p className="card-text"><b>Timings : </b> {doctor.timings[0]} - {doctor.timings[1]}</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        <button className='btn btn-primary' onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>Book Appointment</button>
  </div>
</div>




    </>
  )
}
