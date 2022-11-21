import './App.css';
import { useState } from "react";
import axios from 'axios';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import SimpleSignUp from './pages/SimpleSignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Container from '@mui/material/Container'

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
            <Route path='/template' element={<Template />} />
            <Route path='/signup' element={<SimpleSignUp />} />
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App