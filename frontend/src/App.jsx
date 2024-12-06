import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProfilePage from './pages/profile/ProfilePage';
import SideBar from './components/sidebar/SideBar';
import SideBarPannel from './components/sidebarpannel/SideBarPannel';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useGetMe } from './hooks/useGetMe';

const App = () => {
  const location = useLocation();
  const { user, isLoading, isError } = useGetMe();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
       <span className="loading loading-dots w-28 bg-blue-600"></span>
    </div>
  }


  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
      {location.pathname !== '/signup' && location.pathname !== '/login' && <SideBar />}
      <div className='w-full mt-12 lg:mt-0'>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
          <Route path="/notifications" element={user ? <NotificationsPage /> : <Navigate to='/login' />} />
          <Route path='/profiles/:username' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      {location.pathname !== '/signup' && location.pathname !== '/login' && <SideBarPannel />}
      <Toaster />
    </div>
  );
};

export default App;