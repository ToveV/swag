import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { PageHome } from "./components/main-pages/PageHome";
import { PageDashboard } from "./components/main-pages/PageDashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/temp.scss";
import { useState } from "react";

function App() {
  // const [user, setUser] = useState(null);
  return (
    <div className="App">
      {/* <PageHome /> */}

      <Router>
        <div>
          <Switch>
            <Route path="/dashboard/:id">
              {/* <Route path="/dashboard/:id"> */}
              <PageDashboard />
            </Route>
            <Route path="/">
              <PageHome />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
