// src/Login.tsx
import React, { FormEvent, ChangeEvent, useState } from 'react';
import './Login.css';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';  // Import login API

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      if (res.status === 200) {
        if (signIn({
          auth: {
            token: res.data.accessToken,
            type: 'Bearer'
          },
          userState: { name: res.data.username, uid: res.data.id }
        })) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#007bff' }}>
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
              value={formData.password}
            />
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
};

export default Login;
