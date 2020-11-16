import React, {
  createContext, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

const OverlayContext = createContext();

const OverlayContextProvider = function BoilerPlateForOverlayContextProvider({
  children,
}) {
  const [overlay, setOverlay] = useState(null);

  return (
    <OverlayContext.Provider value={setOverlay}>
      {overlay}
      {children}
    </OverlayContext.Provider>
  );
};

OverlayContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useOverlayContext = function CustomHookToConsumeOverlayContext() {
  return useContext(OverlayContext);
};

export {
  useOverlayContext, OverlayContextProvider,
};
