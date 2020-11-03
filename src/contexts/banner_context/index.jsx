import React, {
  createContext, useContext, useReducer,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Banner, { bannerTypes } from 'general_components/banner';

const BannerContext = createContext();

const BannerContextProvider = function BoilerPlateForBannerContextProvider({
  children,
  value,
}) {
  const initialObject = {
    type: null,
    message: null,
  };

  const reducer = ((state, action) => {
    if (action.clear) {
      return initialObject;
    }
    return { type: action.type, message: action.message };
  });

  const [{ type, message }, dispatchBanner] = useReducer(reducer, initialObject);

  const setBanner = (newType, newMessage) => {
    dispatchBanner({ type: newType, message: newMessage });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatchBanner(initialObject);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [initialObject]);

  return (
    <BannerContext.Provider value={value || setBanner}>
      {message !== null ? <Banner type={type} message={message} /> : null}
      {children}
    </BannerContext.Provider>
  );
};

BannerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.func,
};

BannerContextProvider.defaultProps = {
  value: null,
};

const useBannerContext = function CustomHookToConsumeBannerContext() {
  return useContext(BannerContext);
};

export {
  BannerContext, useBannerContext, BannerContextProvider, bannerTypes,
};
