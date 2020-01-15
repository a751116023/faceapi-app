import React from 'react';
import { Router } from '@reach/router';
import './App.css';

import Home from './pages/home/home';
import SetupFaceId from './pages/setupFaceId/setupFaceId';
import Error from './components/error/error';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Home path="/home" />
        <SetupFaceId path="/" />
        <Error default />
      </Router>
    </div>
  );
}

export default App;
