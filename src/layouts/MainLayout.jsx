import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const MainLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <header className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            <span className="logo-icon">🌱</span>
            CodeSprout
          </Link>
          <nav className="nav-links">
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/practice" className="nav-link">Practice Desk</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Log Out</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Log In</Link>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex" style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      <footer style={{ backgroundColor: '#fff', padding: '2rem 0', textAlign: 'center', marginTop: 'auto' }}>
        <p className="text-muted text-sm">© {new Date().getFullYear()} CodeSprout. Learn to build the web, one fun step at a time.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
