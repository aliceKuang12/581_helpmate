// import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Template from './pages/Template'
// import SignUp from './components/SignUp'
// import Text from './components/Text'
// import TestClass from './components/TestClass'
// import UserName from './components/UserName'
// import {Button} from '@material-ui/core'; //importing material ui component
// import Header from './NavBar.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SimpleSignUp from './pages/SimpleSignUp';

function App() {
  return (
      <Router>
        <Routes>
          <Route path = '/' element={<Homepage/>}/>
          <Route path ='signup' element={<SimpleSignUp/>}/>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/template' element={<Template/>}/>
        </Routes>
    </Router> 
  );
}

export default App;
