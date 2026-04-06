import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const mockBadges = [
    { id: 1, title: 'First Webpage', icon: '🏗️', color: '#FFE4E6', textColor: '#E11D48' },
    { id: 2, title: 'Color Master', icon: '🎨', color: '#E0E7FF', textColor: '#4F46E5' }
  ];

  if (!user) {
    return (
      <div className="container py-16 text-center animate-fade-in w-full">
        <h2 className="text-3xl text-primary mb-4">Please log in to view your dashboard.</h2>
        <Link to="/login" className="btn btn-secondary">Log In</Link>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in w-full">
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
        <div>
          <h1 className="text-4xl text-primary mb-2">Welcome, Sprout! 🌱</h1>
          <p className="text-xl text-muted">Ready to continue your coding journey?</p>
        </div>
        <div className="card text-center" style={{ padding: '1.5rem', minWidth: '200px' }}>
          <h3 className="text-lg text-muted mb-1">Total Points</h3>
          <p className="text-4xl text-accent font-bold" style={{ color: 'var(--accent-dark)' }}>120</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl text-secondary mb-4">Your Progress</h2>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold">HTML Adventures</span>
                <span className="text-muted">50%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#E2E8F0', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
                <div style={{ width: '50%', backgroundColor: '#E11D48', height: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold">CSS Magic</span>
                <span className="text-muted">25%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#E2E8F0', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
                <div style={{ width: '25%', backgroundColor: '#4F46E5', height: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold">JavaScript Sparks</span>
                <span className="text-muted">0%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#E2E8F0', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
                <div style={{ width: '0%', backgroundColor: '#B45309', height: '100%' }}></div>
              </div>
            </div>
          </div>
          <Link to="/courses/html-adventures" className="btn btn-primary w-full mt-6">Continue Learning</Link>
        </div>

        <div className="card" style={{ border: '4px solid var(--accent)' }}>
          <h2 className="text-2xl text-accent mb-4" style={{ color: 'var(--accent-dark)' }}>Your Badges</h2>
          <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
            {mockBadges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center justify-center p-4" style={{ backgroundColor: badge.color, borderRadius: '16px', minWidth: '100px' }}>
                <span style={{ fontSize: '3rem' }}>{badge.icon}</span>
                <span style={{ color: badge.textColor, fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.5rem' }}>{badge.title}</span>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed" style={{ borderColor: '#CBD5E1', borderRadius: '16px', minWidth: '100px' }}>
              <span style={{ fontSize: '2rem', filter: 'grayscale(100%)', opacity: 0.5 }}>❓</span>
              <span className="text-muted font-bold" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Locked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
