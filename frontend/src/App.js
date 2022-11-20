import './App.css';
<<<<<<< HEAD
import axios from 'axios';
import Text from './components/Text'
import TestClass from './components/TestClass'
import UserName from './components/UserName'
import {Button} from '@material-ui/core'; //importing material ui component
import Header from './NavBar.js';

=======
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
>>>>>>> 1525aadb7a432197178d2c4af1e39f1c38afa3e0


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
<<<<<<< HEAD
    // <div>
    //   <button onClick={apiGet}>fetch api</button>
    // </div>
    <div className="Background">
      <div className="MenuBackground">
          <Header/>
      </div>
      <table>
        <tr>
      
          <td>
            <box>
            &ensp;Top Alerts&ensp;
            <card>&ensp;new card&ensp;</card>
            </box>
            <space>&ensp;</space>
            <box>
            &ensp;Academics&ensp;
            <card>&ensp;new card&ensp;</card>
            </box>
            <space>&ensp;</space>
            <box>
            &ensp;Health&ensp;
            <card>&ensp;new card&ensp;</card>
            </box>
            <br></br>          
          </td>
        </tr>
        <space>&ensp;</space>
        <tr>
          <td>
          <box>
            &ensp;Notes&ensp;
            <card>&ensp;new card&ensp;</card>
            </box>
            <space>&ensp;</space>
            <box>
            &ensp;Travel&ensp;
            <card>&ensp;new card&ensp;</card>
            </box>
            <space>&ensp;</space>
            <box>
            &ensp;Social&ensp;
            <card>&ensp;new card&ensp;</card>
            </box>
          </td>
        </tr>
      </table>
    </div>
   
=======
      <Router>
        <Routes>
          <Route path = '/' element={<Homepage/>}/>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/template' element={<Template/>}/>
        </Routes>
    </Router> 
>>>>>>> 1525aadb7a432197178d2c4af1e39f1c38afa3e0
  );
}

export default App;
