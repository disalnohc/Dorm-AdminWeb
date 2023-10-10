import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';

import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';


//admin
import HeaderBar from './layout/HeaderBar';
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

//user
import Header from './pages/users/common/header/Header';
//import Foonter from './pages/users/common/footer/Footer';
import HomePage from './pages/users/home/Home';
import About from './pages/users/about/About';
import Blog from './pages/users/blog/Blog';
import Contact from './pages/users/contact/Contact';
import Review from './pages/users/review/Review';
import Booking from './pages/users/booking/Booking';
import Service from './pages/users/service/Service';
import RoomDetail from './pages/users/home/recent/RoomDetail';
import AgreementPage from './pages/users/home/recent/AgreementPage';
import BillPayment from './pages/users/home/recent/BillPayment';

import { auth } from './firebase';
import { firestore } from './firebase';

import { TailSpin } from 'react-loader-spinner'; //loading 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [getRole, setGetRole] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsAuthenticated(true);
        setIsLoading(true);
        const user = authUser.uid;
        console.log(user);
        const docRef = firestore.collection('profiles').doc(user);

        docRef.get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              const role = userData.role;
              if (role === 'admin') {
                setIsAdmin(true);
                setGetRole(true);
                setIsLoading(false);
              } else {
                setIsAdmin(false);
                setGetRole(true);
                setIsLoading(false);
              }
            } else {
              console.log("ไม่พบเอกสารสำหรับผู้ใช้นี้");
            }
          })
          .catch((error) => {
            console.log("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
          });
      } else {
        setIsAdmin(false);
        setIsAuthenticated(false);
        setGetRole(false);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  function admin_menu() {
    console.log('admin_menu');
    return (
      <>
        <SideBar />
        <main className="content">
          <HeaderBar setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />
          <div className="content_body">
            <Box m="20px">
              <Routes>
                <>
                  <Route path="/user/login" element={<Navigate to="/admin/dashboard" />} />
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
                </>
              </Routes>
            </Box>
          </div>
        </main>
      </>
    )
  }

  function user_menu() {
    console.log('user_menu');
    return (
      <>
        <main className="content">
          <Header setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />
          <div className="content_user">
            <Box>
              <Routes>
                <>
                  <Route path="/user/login" element={<Navigate to="/user/home" />} />
                  <Route path="/user/home" element={<HomePage />} />
                  <Route path="/user/about" element={<About />} />
                  <Route path="/user/contact" element={<Contact />} />
                  <Route path="/user/review" element={<Review />} />
                  <Route path="/user/blog" element={<Blog />} />
                  <Route path="/user/booking" element={<Booking />} />
                  <Route path="/user/service" element={<Service />} />
                  <Route path="/user/roomdetail" element={<RoomDetail />} />
                  <Route path="/user/agreement" element={<AgreementPage/>} />
                  <Route path="/user/billpayment" element={<BillPayment/>} />
                </>
              </Routes>
            </Box>
          </div>
        </main>
      </>
    );
  }
  

  if (isAuthenticated === true) {
    if (isLoading === false && getRole === true) {
      return (
        <div className="app">
          <>
            <CssBaseline />
            {isAdmin ? admin_menu() : user_menu()}
          </>
        </div>
      );
    } else {
      return (
        <div className="app" style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center'}}>
          <>
            <CssBaseline />
            <TailSpin
              height="160"
              width="160"
              color="orange"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </>
        </div>
      );
    }
  } else {
    return (
      <main className="content">
      <Header setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />
      <div className="content_user">
        <Box>
          <Routes>
            <>
              <Route path="/" element={<Navigate to="/user/home" />} />
              <Route path="/user/home" element={<HomePage />} />
              <Route path="/user/about" element={<About />} />
              <Route path="/user/contact" element={<Contact />} />
              <Route path="/user/review" element={<Review />} />
              <Route path="/user/blog" element={<Blog />} /> 
              <Route path="/user/regsiter" element={<RegisterForm />} />
              <Route path="/user/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
            </>
          </Routes>
        </Box>
      </div>
    </main>
    )
  }

};
export default App;