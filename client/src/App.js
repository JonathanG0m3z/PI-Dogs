import './App.css';
import { Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';


function App() {

  const onSearch = (query)=>{};
  return (
    <div className="App">
      <Route exact path="/"><Main /></Route>
      <Route exact path="/home"><Home /></Route>
      <Route exact path="/detail"><Detail /> </Route>
      <Route exact path="/create"><Create /> </Route>
    </div>
  );
}

export default App;
