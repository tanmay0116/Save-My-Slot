import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import Page from './pages/PageNotFound'
import DoctorAppointments from './pages/DoctorAppointments';
import './App.css'
function App() {
  const {loading} = useSelector(state=>state.alerts )
  return (
    <BrowserRouter>
    {loading ?(<Spinner/>):(
    <div className='front-page'>
      <Routes>
      <Route path='/apply-doctor' element={<ProtectedRoutes><ApplyDoctor/></ProtectedRoutes>} />
      <Route path='/apply-doctor/*' element={<Page/>} />
      <Route path='/admin/users' element={<ProtectedRoutes><Users/></ProtectedRoutes>} />
      <Route path='/admin/users/*' element={<Page/>} />
      <Route path='/admin/doctors' element={<ProtectedRoutes><Doctors/></ProtectedRoutes>} />
      <Route path='/admin/doctors/*' element={<Page/>} />
      <Route path='/doctor/profile/:id' element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />  
      <Route path='/doctor/profile/:id/*' element={<Page/>} />
      <Route path='/doctor/book-appointment/:doctorId' element={<ProtectedRoutes><BookingPage/></ProtectedRoutes>} />   
      <Route path='/doctor/book-appointment/:doctorId/*' element={<Page/>} />
      <Route path='/notification' element={<ProtectedRoutes><NotificationPage/></ProtectedRoutes>} />
      <Route path='/notification/*' element={<Page/>} />
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
      <Route path='/appointments' element={<ProtectedRoutes><Appointments/></ProtectedRoutes>} />
      <Route path='/appointments/*' element={<Page/>} />
      <Route path='/doctor-appointments' element={<ProtectedRoutes><DoctorAppointments/></ProtectedRoutes>} />
      <Route path='/doctor-appointments/*' element={<Page/>} />
      <Route path='/' element={<ProtectedRoutes><Homepage/></ProtectedRoutes>} />
      <Route path='/*' element={<Page/>} />
    </Routes>
    </div>
    )}
    </BrowserRouter>
  );
}

export default App;
