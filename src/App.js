import './App.css';

import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} key="general" pageSize={10} category={"general"} /></Route>
          <Route exact path="/general"><News setProgress={setProgress} key="general" pageSize={10} category={"general"} /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} key="entertainment" pageSize={10} category={"entertainment"} /></Route>
          <Route exact path="/business"><News setProgress={setProgress} key="business" pageSize={10} category={"business"} /></Route>
          <Route exact path="/health"><News setProgress={setProgress} key="health" pageSize={10} category={"health"} /></Route>
          <Route exact path="/science"><News setProgress={setProgress} key="sciencel" pageSize={10} category={"sciencel"} /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} key="sports" pageSize={10} category={"sports"} /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} key="technology" pageSize={10} category={"technology"} /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;