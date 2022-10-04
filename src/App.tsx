import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Containers/Home";
import Game from "./Containers/Game";
import "./App.css";

export const App = () => {
  return (
    <>
      <Navigation />
      <Router>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
