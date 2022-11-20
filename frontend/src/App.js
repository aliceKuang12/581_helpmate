import './App.css';
import axios from 'axios';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
      <Router>
        <Routes>
          <Route path = '/' element={<Homepage/>}/>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/template' element={<Template/>}/>
        </Routes>
    </Router> 
  );
}

export default App;
