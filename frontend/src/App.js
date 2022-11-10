import './App.css';
import {Button, Typography} from '@material-ui/core'; //importing material ui component
import Header from './components/NavBar';
import { Container } from '@mui/material';
import Homepage from "./pages/Homepage"

function App() {
  return(
    <Container>
      <Header/>
    <Homepage/>
</Container>);

}

export default App;
