import './App.css';
import { Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Home from './components/Home/Home';


function App() {

  const onSearch = (query)=>{};
  return (
    <div className="App">
      <Route exact path="/"><Main /></Route>
      <Route exact path="/home"><Home /></Route>
    </div>
  );
}

export default App;
