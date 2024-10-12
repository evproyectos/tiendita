// src/SignUp.tsx
import React from 'react';
import './SignUp.css';

const SignUp: React.FC = () => {
  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 signup-card">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          <div className="mt-3 text-center">
            <span>Already Registered?</span> <a href="#" className="text-decoration-none">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
