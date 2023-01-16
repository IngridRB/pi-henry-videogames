import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import Home from './components/Home/Home';
import CreateVG from './components/CreateVG/CreateVG';
import VGDetails from './components/Details/Details';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/home/" component={Home} />
          <Route exact path="/create/" component={CreateVG} />
          <Route path="/videogame/:id/" component={VGDetails} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
