import './App.css';
import axios from 'axios';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  
  const apiGet = ()=>{
    axios.get('http://localhost:5000/', {
      headers: { "Access-Control-Allow-Origin": "*"
    }
  })
    .then(function (response) {
        console.log(response.data);

  });
  }
  
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
