import React from 'react'
import '../styles/Layout.css'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Badge, message} from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({children}) {
    const navigate = useNavigate();
    const {user}  = useSelector(state=>state.user);
        const handleLogout=()=>{
        localStorage.clear();
        message.success('Logout Successfully!')
        navigate('/login')
    }
  return (
    <>
    <div className="main">
        <div className="layout">
            {/* 
                
                    <div className={`menu-item`} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                </div>
            </div> */}



                <Sidebar/>








            <div className="content">
                {/* <div className="header"> 
                    <div className="header-content"> */}
                        {/* <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification')}} style={{cursor:'pointer'}}>  
                        <i className="fa-solid fa-bell" style={{cursor:'pointer',fontSize:'1.3em'}}></i>
                        </Badge>
                        <Link to='/profile'>{user?.name}</Link> */}
                    <Header/>
                    {/* </div>
                </div> */}
                <div className="body">{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}
