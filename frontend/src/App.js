/* src/App.js */
import React, { useEffect, useState } from 'react'

import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Health from './pages/Health'
import Travel from './pages/Travel'
import Social from './pages/Social'
import Academics from './pages/Academic'
import Streaks from './pages/Streaks'
import Container from '@mui/material/Container'
import ForgotPassword from './pages/ForgotPassword';
import Todo from './pages/Todo'
import { Amplify, API, graphqlOperation } from 'aws-amplify'

import { AuthProvider } from './context/AuthContext';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {

const initialState = { name: '', description: '' }
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
          <Route path = '/todo' element={<Todo setCurrentUser={setCurrentUser}/>} />
          <Route path = '/health' element={<Health setCurrentUser={setCurrentUser}/>} />
          <Route path = '/travel' element={<Travel setCurrentUser={setCurrentUser}/>}/>
          <Route path = '/social' element={<Social setCurrentUser={setCurrentUser}/>}/>
          <Route path = '/template' element={<Template/>}/>
          <Route path = '/academics' element={<Academics setCurrentUser={setCurrentUser}/>}/>
          <Route path = '/streaks' element={<Streaks setCurrentUser={setCurrentUser}/>}/>
          <Route path = '/home' element = {<Homepage setCurrentUser={setCurrentUser}/>}/>
          <Route path='/forgot-password' element={<ForgotPassword />} />

        </Routes>
        </AuthProvider>
    </Router>
  </Container>
);
}
export default App