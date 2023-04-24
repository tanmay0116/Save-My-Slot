import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function PageNotFound() {
    const navigate = useNavigate();
  return (
    <Result
    status="404"
    title="404"
    // subTitle='Page Not Found!'
    extra={<div><h3>Page Not Found!</h3><Button style={{marginTop:'2em'}} type="primary" onClick={()=>navigate(-1)}>Go Back</Button></div>}
  />
  )
}
