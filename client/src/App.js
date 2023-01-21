import './App.css';
import { Route, useLocation } from 'react-router-dom';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';


function App() {
  return (
    <div className="App">
      {useLocation().pathname!=='/' && <Nav />}
      <Route exact path="/"><Main /></Route>
      <Route exact path="/home"><Home /></Route>
    </div>
  );
}

export default App;
