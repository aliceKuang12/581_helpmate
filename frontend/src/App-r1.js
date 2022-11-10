import './App.css';
import ReactDOM from "react-dom/client";
import {Button, Typography} from '@material-ui/core'; //importing material ui component
import Header from './components/NavBar';
import { Container } from '@mui/material';
import Homepage from "./pages/Homepage";
import Template from "./pages/Template";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (<BrowserRouter> 
  <Header/>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="template" element={<Template/>}/>
  </Routes>
  </BrowserRouter>);
}


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
export default App;
