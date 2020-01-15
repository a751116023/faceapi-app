import React from 'react';

import classes from './home.module.css';

const Home = () => {
  return ( 
    <div className={classes.wrapper}>
      <h1>FaceAPI Manager</h1>
      <br />
      <Link to="/setup">Setup Face ID</Link>
    </div>
  );
}

export default Home;