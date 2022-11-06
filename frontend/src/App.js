import logo from './logo.svg';
import './App.css';
import Text from './components/Text'
import TestClass from './components/TestClass'
import UserName from './components/UserName'
import {Button} from '@material-ui/core'; //importing material ui component
import Header from './NavBar.js';


function App() {
  return (
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
  );
}

export default App;
