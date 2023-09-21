import React, { useState } from 'react';
import LoginForm from './pages/LoginForm';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeaderBar from './layout/HeaderBar';
import { CssBaseline, Box } from '@mui/material';
import SideBar from './layout/SideBar';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Calender from './pages/admin/calendar/Calender';
import News from './pages/admin/new/New';
import Clean from './pages/admin/clean/Clean';
import Detail from './pages/admin/detail/Detail';
import Notifybill from './pages/admin/notifybill/Notifybill';
import Paybill from './pages/admin/paybill/Paybill';
import Personnel from './pages/admin/personnel/Personnel';
import Repair from './pages/admin/repair/Repair';
import Room from './pages/admin/room/Room';
import Security from './pages/admin/security/Security';
import Water from './pages/admin/water/Water';
import Electricity from './pages/admin/electricity/Electricity';
import Profile from './pages/admin/profile/Profile'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app">
      <>
        <CssBaseline />
        {isAuthenticated ? (
          <>
            <SideBar />
            <main className="content">
              <HeaderBar />
              <div className="content_body">
                <Box m="20px">
                  <Routes>
                    <Route
                      path="/admin"
                      element={<Navigate to="/admin/dashboard" />}
                    />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/calendar" element={<Calender />} />
                    <Route path="/admin/news" element={<News />} />
                    <Route path="/admin/clean" element={<Clean />} />
                    <Route path="/admin/detail" element={<Detail />} />
                    <Route path="/admin/notifybill" element={<Notifybill />} />
                    <Route path="/admin/paybill" element={<Paybill />} />
                    <Route path="/admin/personnel" element={<Personnel />} />
                    <Route path="/admin/repair" element={<Repair />} />
                    <Route path="/admin/room" element={<Room />} />
                    <Route path="/admin/water" element={<Water />} />
                    <Route path="/admin/electricity" element={<Electricity />} />
                    <Route path="/admin/security" element={<Security />} />
                    <Route path="/admin/profile" element={<Profile />} />
                  </Routes>
                </Box>
              </div>
            </main>
          </>
        ) : (
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        )}
      </>
    </div>
  );
};

export default App;
