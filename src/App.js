import React from 'react';
import { Router } from '@reach/router';
import './App.css';

import Home from './pages/home/home';
import SetupFaceId from './pages/setupFaceId/setupFaceId';
import Verification from './pages/verification/verification';
import Error from './components/error/error';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <SetupFaceId path="/setup" />
        <Error default />
      </Router>
    </div>
  );
}

export default App;
