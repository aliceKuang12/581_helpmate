import './App.css';
import { useState } from "react";
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Health from './pages/Health'
import Travel from './pages/Travel'
import Social from './pages/Social'
import Academics from './pages/Academic'
import Streaks from './pages/Streaks'
import PasswordReset from './pages/PasswordReset'
import { AuthProvider } from './context/AuthContext';
import Container from '@mui/material/Container'
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <Container>
      <Router>
        <AuthProvider>
          <Routes>
            <Route 
              path = '/' 
              element={<Homepage user={currentUser}/>}
            />
            <Route 
              path = '/login' 
              element={<Login setCurrentUser={setCurrentUser}/>}
            />
            <Route path = '/health' element={<Health setCurrentUser={setCurrentUser}/>} />
            <Route path = '/travel' element={<Travel setCurrentUser={setCurrentUser}/>}/>
            <Route path = '/social' element={<Social setCurrentUser={setCurrentUser}/>}/>
            <Route path = '/template' element={<Template/>}/>
            <Route path = '/academics' element={<Academics setCurrentUser={setCurrentUser}/>}/>
            <Route path = '/streaks' element={<Streaks setCurrentUser={setCurrentUser}/>}/>
            <Route path = '/home' element = {<Homepage setCurrentUser={setCurrentUser}/>}/>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path = '/reset' element={<PasswordReset/>}/>
          </Routes>c
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App