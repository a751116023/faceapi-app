import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import './App.css';
// import Home from './pages/home/home';
import SetupFaceId from './pages/setupFaceId/setupFaceId';
// import Error from './components/error/error';

const App = () => {
  return (
    <div className="App">
      <Router history={createHistory({ basename: process.env.PUBLIC_URL })}>
        <Route exact path="/" component={SetupFaceId} />
      </Router>
    </div>
  );
}

export default App;
