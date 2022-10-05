import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLoaderStore from "./Store/loaderStore";
import Navigation from "./Components/Navigation";
import Home from "./Containers/Home";
import Game from "./Containers/Game";
import Loader from "./Components/Loader";
import "./App.css";

export const App = () => {
  const displayLoader = useLoaderStore((state) => state.displayLoader);
  const loaderMessage = useLoaderStore((state) => state.loaderMessage);
  console.log('displayLoader', displayLoader);
  return (
    <>
    {displayLoader && <Loader message={loaderMessage} />}
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
