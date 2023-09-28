import React, { useState, useEffect } from 'react';
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

import { auth } from './firebase';
import { firestore } from './firebase';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isLogin = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        const user = authUser.uid;
        console.log(user)
        const docRef = firestore.collection('profiles').doc(user);

        docRef.get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              const role = userData.role;
              console.log("Role:", role);
              if (role === 'admin') {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
            } else {
              console.log("ไม่พบเอกสารสำหรับผู้ใช้นี้");
            }
          })
          .catch((error) => {
            console.log("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
          });
      }
    });
    return () => {
      isLogin();
    };
  }, []);

  function admin_menu() {
    return (
      <>
        <SideBar />
        <main className="content">
          <HeaderBar setIsAuthenticated={setIsAuthenticated} />
          <div className="content_body">
            <Box m="20px">
              <Routes>
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
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
    )
  }

  function user_menu() {
    return (
      <>
        <SideBar />
        <main className="content">
          <HeaderBar setIsAuthenticated={setIsAuthenticated} />
          <div className="content_body">
            <Box m="20px">
              <Routes>
                <Route path="/" element={<Navigate to="/user/profile" />} /> {/* ใส่ Route User ตรงนี้ */}
                <Route path="/user/profile" element={<Profile />} />
              </Routes>
            </Box>
          </div>
        </main>
      </>
    )
  }

  function login_menu() {
    return (
      <Routes>
        <Route path="/" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
      </Routes>
    )
  }

  return (
    <div className="app">
      <>
        <CssBaseline />
        {isAuthenticated ? (isAdmin ? admin_menu() : user_menu()) : login_menu()}
      </>
    </div>
  );
};

export default App;
