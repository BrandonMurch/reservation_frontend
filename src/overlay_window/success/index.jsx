// Dependencies
import React from 'react';

// Stylesheets
import style from './success.module.css';

function Success() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        Reservation was made successfully.
      </h1>
    </div>
  );
}

export default Success;
