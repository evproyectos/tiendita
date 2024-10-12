// src/Login.tsx
import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#007bff' }}>
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
          <div className="mt-3 text-center">
            <a href="#" className="text-decoration-none">Forgot Password?</a>
            <br />
            <a href="#" className="text-decoration-none">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
