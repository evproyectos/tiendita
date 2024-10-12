import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Login from '../pages/Login/Login';
import AuthProvider from 'react-auth-kit';
import store from '../store/store';


const AppRoutes = () => {
  return (
    <AuthProvider store={store}>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                <Route path='/' element={<Home />} />
                </Route>
            </Routes>
            
        </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
