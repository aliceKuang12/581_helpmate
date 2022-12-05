import './App.css';
import { useState } from "react";
import axios from 'axios';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import SimpleSignUp from './pages/SimpleSignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import Health from './pages/Health'
import Travel from './pages/Travel'
import Social from './pages/Social'
import Academics from './pages/Academic'
import Streaks from './pages/Streaks'
import PasswordReset from './pages/PasswordReset'
=======
import { AuthProvider } from './context/AuthContext';
import Container from '@mui/material/Container'
import ForgotPassword from './pages/ForgotPassword';

>>>>>>> origin/firebase
function App() {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <Container>
      <Router>
<<<<<<< HEAD
        <Routes>
          <Route 
            path = '/' 
            element={<Homepage user={currentUser}/>}/>
          <Route 
            path = '/login' 
            element={<Login setCurrentUser={setCurrentUser}/>}/>
          <Route path = '/health' element={<Health/>}/>
          <Route path = '/reset' element={<PasswordReset/>}/>
          <Route path = '/travel' element={<Travel/>}/>
          <Route path = '/social' element={<Social/>}/>
          <Route path = '/template' element={<Template/>}/>
          <Route path = '/academics' element={<Academics/>}/>
          <Route path = '/streaks' element={<Streaks/>}/>
          <Route path = '/home' element = {<Homepage/>}/>
        </Routes>
    </Router> 
=======
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
            <Route path='/template' element={<Template />} />
            <Route path='/signup' element={<SimpleSignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
>>>>>>> origin/firebase
  );
}

export default App