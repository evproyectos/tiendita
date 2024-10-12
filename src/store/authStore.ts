import createStore from 'react-auth-kit/createStore';

const auth_store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  export default auth_store;