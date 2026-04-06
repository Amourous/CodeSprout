import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    
    // Pass username to metadata so we can use a trigger to create the profile later, or handled directly.
    const { error: signUpError } = await signUp({ 
      email, 
      password,
      options: {
        data: { username, role: 'student' }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setMessage('Registration successful! Please check your email to verify your account, or log in if auto-confirmed.');
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  };

  return (
    <div className="container py-16 flex justify-center items-center w-full animate-fade-in">
      <div className="card w-full" style={{ maxWidth: '400px' }}>
        <h2 className="text-3xl text-secondary text-center mb-6">Join CodeSprout!</h2>
        
        {error && <div className="badge badge-html mb-4 text-center w-full block py-2">{error}</div>}
        {message && <div style={{ backgroundColor: '#E2FBE8', color: '#1B5E20', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Cool Username" 
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
          />
          <input 
            type="email" 
            placeholder="Parent or Your Email" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Secret Password" 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" className="btn btn-secondary w-full mt-2">Sign Up 🚀</button>
        </form>
        <p className="text-center mt-6 text-muted">
          Already have an account? <Link to="/login" className="text-primary font-bold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
