import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const role = login(email, password);
    if (role === 'Admin') navigate('/admin/dashboard');
    else if (role === 'Customer') navigate('/customers/dashboard');
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;