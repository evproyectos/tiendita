import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Login from '../pages/Login/Login';
import AuthProvider from 'react-auth-kit';
import auth_store from '../store/authStore';
import SignUp from '../pages/SignUp/SignUp';
import Cart from '../pages/Cart/Cart';
import Shop from '../pages/Shop/Shop';
import SearchResults from '../pages/Search/SearchResults';


const AppRoutes = () => {
  return (
    <AuthProvider store={auth_store}>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/search-results' element={<SearchResults />} />
                </Route>
            </Routes>
            
        </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
