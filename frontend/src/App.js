import './App.css';
import { useState } from "react";
import axios from 'axios';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Health from './pages/Health'
import Travel from './pages/Travel'
import Social from './pages/Social'
import Academics from './pages/Academic'
import Streaks from './pages/Streaks'
// import PasswordReset from './pages/PasswordReset'
import { AuthProvider } from './context/AuthContext';
import Container from '@mui/material/Container'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';


function App() {
  return (
    <Container>
      <Router>
        <AuthProvider>
          <Routes>
            <Route 
              path = '/' 
              element={<Login/>}
            />
            {/* <Route 
              path = '/login' 
              element={<Login/>}
            /> */}
            <Route path = '/health' element={<Health/>} />
            <Route path = '/travel' element={<Travel/>}/>
            <Route path = '/social' element={<Social/>}/>
            <Route path = '/academics' element={<Academics/>}/>
            <Route path = '/profile' element={<Profile/>}/>
            <Route path = '/streaks' element={<Streaks/>}/>
            <Route path = '/home' element = {<Homepage/>}/>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            {/* <Route path = '/reset' element={<PasswordReset/>}/> */}
          </Routes>c
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App