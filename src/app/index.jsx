// Dependencies
import React, { useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

// Components
import OverlayWindow from '../overlay_window';
import AdminLogin from '../admin_login';
import AdminDashboard from '../admin_dashboard';
// import AuthorizationWrapper from '../authorization_wrapper';
import { TokenContextProvider } from '../contexts/token_context';

// CSS
import style from './app.module.css';
import 'css/responsive.css';

function App() {
  const [displayOverlay, setOverlayDisplay] = useState(false);

  const textOpacity = displayOverlay ? style.textContainerTransparent : style.textContainer;

  if (window.location.pathname && window.location.pathname !== '/' && displayOverlay === false) {
    setOverlayDisplay(true);
  }

  return (
    <TokenContextProvider>
      <Switch className={style.app}>
        <Route path="/admin-login" component={AdminLogin} />
        <Route
          path="/admin"
          render={() => (
            // NOTE: Temporarily disabled route protection, re-enable after development
            // <AuthorizationWrapper>
            <AdminDashboard />
            // </AuthorizationWrapper>
          )}
        />
        <Route
          render={() => (
            <>
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
                <OverlayWindow closeOverlay={() => setOverlayDisplay(!displayOverlay)} />
              )}
            </>
          )}
        />
      </Switch>
    </TokenContextProvider>
  );
}

export default App;
