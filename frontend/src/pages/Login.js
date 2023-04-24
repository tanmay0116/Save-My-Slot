import React,{useState} from 'react'
import { message } from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import '../styles/RegisterStyles.css'
import axios from 'axios'
import '../styles/login.css'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import logo from '../images/logo.png'
export default function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [inputData,setInputData] = useState({email:'',password:''});
  const handleInputChange=(e)=>{
    setInputData({...inputData,[e.target.name]:e.target.value});
  }
  const onfinishHandler=async(e)=>{
    try {
      e.preventDefault();
      dispatch(showLoading())
      const res = await axios.post('http://localhost:8080/login',inputData);
      window.location.reload();
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        message.success('Login Successfully!');
        navigate('/')

      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('something went wrong');
    }
}
  return (
  
    <div className='main-box'>
      <MDBContainer className='my-card'>

<MDBCard>
  <MDBRow>

    <MDBCol md='6'>
      <MDBCardImage src={logo} alt="login form" className='image'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
          <span className="h1 fw-bold mb-0">Save-My-Slot</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

          <form onSubmit={onfinishHandler}>
          <MDBInput wrapperClass='mb-4' label='Email address' type='email' size="lg" name='email' value={inputData.email} onChange={handleInputChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' type='password' size="lg" name='password' value={inputData.password} onChange={handleInputChange}/>

          <MDBBtn className='mx-2' color='info' style={{width:'20%'}}>Login</MDBBtn>
          </form>
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to='/register'>Register here</Link> </p>

        <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
    </div>

  )
}
