import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { message,Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.user);

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully!')
    navigate('/login')
  };

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>
          <Box>
            <Tooltip title="Logout from here">
              <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                <Avatar alt="img" src="https://www.apnrts.ap.gov.in/AssetsNew/images/avatardefault_92824.png" />
              </IconButton>
            </Tooltip>
            </Box>
            <Box style={{marginRight:'1.5em'}}>
            <Badge title='Notification Page' count={user && user.notification.length} onClick={()=>{navigate('/notification')}} style={{cursor:'pointer'}}>  
                        <Tooltip title="Click to view notification page">
                        <i className="fa-solid fa-bell" style={{cursor:'pointer',fontSize:'1.5em',color:'white'}}></i>
                        </Tooltip>
                        </Badge>
            </Box>
            <h5 style={{marginRight:'1em',marginTop:'.4em'}}>{user?.name}</h5>
            </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default Header;