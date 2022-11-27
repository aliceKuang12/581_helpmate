import './App.css';
import { useState } from "react";
import axios from 'axios';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Health from './pages/Health'
import Travel from './pages/Travel'
import PasswordReset from './pages/PasswordReset'
function App() {
  const [currentUser, setCurrentUser] = useState('')

  return (
      <Router>
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
          <Route path = '/template' element={<Template/>}/>
        </Routes>
    </Router> 
  );
}

export default App;
