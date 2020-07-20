// Dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// Components
import OverlayWindow from '../overlay_window';

// CSS
import style from './app.module.css';

function App() {
  const [displayOverlay, setOverlayDisplay] = useState(false);

  const textOpacity = displayOverlay
    ? style.textContainerTransparent
    : style.textContainer;

  if (window.location.pathname
    && window.location.pathname !== '/'
    && displayOverlay === false) {
    setOverlayDisplay(true);
  }

  return (
    <Router className={style.app}>
      <div className={textOpacity}>
        <Link
          to="/calendar"
          data-testid="opening-link-calendar"
          className={style.text}
          onClick={() => setOverlayDisplay(!displayOverlay)}
        >
          Click here to make a reservation
        </Link>
      </div>
      {displayOverlay && (
        <OverlayWindow
          closeOverlay={() => setOverlayDisplay(!displayOverlay)}
        />
      )}
    </Router>
  );
}

export default App;
