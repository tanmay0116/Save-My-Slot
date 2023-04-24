import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker,message } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
export default function ApplyDoctor() {
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    // const []
    const navigate = useNavigate();
    const handleFinish=async(values)=>{
            try {
                console.log(moment(values.timings[1]).utcOffset('+00:00').format('YYYY-MM-DD HH:mm'));
                console.log(values.timings[0].format("HH:mm"));
                console.log(values.timings[1].format("HH:mm"));
                dispatch(showLoading());
                const res = await axios.post('http://localhost:8080/apply-doctor',{...values,userId:user._id,timings:[
                    values.timings[0].format("HH:mm"),
                    values.timings[1].format("HH:mm")
                  ]},{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                dispatch(hideLoading());
                if(res.data.success){
                    message.success(res.data.message)
                    navigate('/');
                }else{
                    message.error(res.data.message);
                }
            } catch (error) {
                dispatch(hideLoading())
                console.log(error);
                message.error('Something Went Wrong!');
            }
    }
  return (
    <Layout>
        <h1 className='text-center'>Apply doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
        <h4>Personal Details : </h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='First Name' name="firstName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your First Name' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Last Name' name="lastName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Last Name' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Phone Number' name="phone" required rules={[{required:true}]}>
                        <Input type='number' placeholder='Your Phone Number' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Email' name="email" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Email' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Your Website' name="website">
                        <Input type='text' placeholder='Your Website' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Address' name="address" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Address' />
                    </Form.Item>
                </Col>
            </Row>
            <h4>Professional Details : </h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Specialization' name="specialization" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Specialization' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Experience' name="experience" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Experience' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Consultation Fees' name="feesPerConsulatation" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Consultation Fees' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Timings' name="timings" required rules={[{required:true}]}>
                       <TimePicker.RangePicker format='HH:mm'/>
                       </Form.Item>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
        </Form>
    </Layout>
  )
}
