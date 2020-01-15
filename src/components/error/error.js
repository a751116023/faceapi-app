import React from 'react';

import classes from './error.module.css';
import { Link } from '@reach/router';

const Error = () => {
  return ( 
    <div className={classes.wrapper}>
      <h1>404 - Page Not Found</h1>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Error;