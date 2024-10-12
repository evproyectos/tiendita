import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css'; 
import { Provider } from 'react-redux';
import { store,persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
      
    </Provider>
  </React.StrictMode>
);
