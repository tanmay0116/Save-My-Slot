import { Layout, Menu } from 'antd';
import React from 'react';
import { userMenu,AdminMenu } from '../Data/data'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import '../styles/sidebar.css'
import logo from '../images/logo.png'
const {  Sider } = Layout;
const Sidebar = () => {
    const {user} = useSelector(state=>state.user)
    const doctorMenu = [
        {
            name:'Home',
            path:'/',
            icon:"fa-solid fa-house-chimney-user"
        },
        {
            name:"Appointments",
            path:"/doctor-appointments",
            icon:"fa fa-list-alt"
        },
        {
            name:'Profile',
            path:`/doctor/profile/${user?._id}`,
            icon:"fa-solid fa-id-badge"
        }
        
    ];

    const SidebarMenu = user?.isAdmin?AdminMenu:user?.isDoctor?doctorMenu:userMenu;

  return (
    <Layout className='sidebar'>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <img src={logo} alt="logo" className='logo' />
        <Menu
          theme="dark"
        //   mode="inline"
        //   defaultSelectedKeys={['4']}
          items={
            SidebarMenu.map(menu=>({
                // key: String(name),
                icon: React.createElement('i',{className:menu.icon},''),
                label: React.createElement(Link,{to:menu.path},menu.name),
               
            }),
  )}
        />
      </Sider>
    </Layout>
  );
};
export default Sidebar;