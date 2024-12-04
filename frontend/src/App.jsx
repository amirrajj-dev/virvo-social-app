import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProfilePage from './pages/profile/ProfilePage'
import SideBar from './components/sidebar/SideBar';
import SideBarPannel from './components/sidebarpannel/SideBarPannel';
import {useLocation} from 'react-router-dom'

const App = () => {
  const location = useLocation()
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
      {location.pathname === '/signup' || location.pathname === '/login' ? <></> : <SideBar />}
      <div className='w-full mt-12 lg:mt-0'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path='/profiles/:id' element={<ProfilePage/>} />
        </Routes>
      </div>
      {location.pathname === '/signup' || location.pathname === '/login' ? <></> : <SideBarPannel />}
    </div>
  );
};

export default App;