import logo from './logo.svg';
import './App.css';
import Text from './components/Text'
import TestClass from './components/TestClass'
import UserName from './components/UserName'

function App() {
  return (
    <div className="Background">
      <div className="MenuBackground">
          <div className="Menu">
            <Text></Text>
          </div>
          <div className="UserName">
            <UserName></UserName>
          </div>
      </div>
      <table>
        <tr>
          <td>
          <al>
            &ensp;Alerts&ensp;
          </al>
          </td>
          <td>
          <ac>
            &ensp;Academics&ensp;
          </ac>
          </td>
          <td>
          <he>
            &ensp;Health&ensp;
          </he>
          </td>
        </tr>
        <tr>
          <td>
          <no>
            &ensp;Notes&ensp;
          </no>
          </td>
          <td>
          <trav>
            &ensp;Travel&ensp;
          </trav>
          </td>
          <td>
          <so>
            &ensp;Social&ensp;
          </so>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
