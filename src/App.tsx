import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Containers/Home';
import Game from './Containers/Game';
import './App.css';

export const App = () => {
  return (
    <>
        <Navigation />
        <Router>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/game" component={Game} />
          </Switch>
        </Router>
    </>
  );
}

export default App;