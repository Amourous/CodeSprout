import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { error: signInError } = await signIn({ email, password });
    if (signInError) {
      setError(signInError.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="container py-16 flex justify-center items-center w-full animate-fade-in">
      <div className="card w-full" style={{ maxWidth: '400px' }}>
        <h2 className="text-3xl text-primary text-center mb-6">Welcome Back!</h2>
        {error && <div className="badge badge-html mb-4 text-center w-full block py-2">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full mt-2">Log In</button>
        </form>
        <p className="text-center mt-6 text-muted">
          Don't have an account? <Link to="/register" className="text-secondary font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
