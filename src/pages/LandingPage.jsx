import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container py-8 flex-col animate-fade-in" style={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-8 mb-8" style={{ minHeight: '60vh' }}>
        <h1 className="text-5xl text-primary mb-4 animate-bounce-slow">
          Learn to build the web, <span className="text-secondary">one fun step at a time!</span>
        </h1>
        <p className="text-xl text-muted mb-8" style={{ maxWidth: '600px' }}>
          CodeSprout makes coding super fun and easy. Start your journey into the world of websites today!
        </p>
        <div className="flex gap-4">
          <Link to="/courses" className="btn btn-primary text-xl">Start Learning 🚀</Link>
          <Link to="/practice" className="btn btn-outline text-xl">Explore Practice</Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div className="card text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
          <h3 className="text-2xl mb-2 text-primary">Fun & Interactive</h3>
          <p className="text-muted">Short, bite-sized lessons that feel more like a game than a textbook.</p>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
          <h3 className="text-2xl mb-2 text-secondary">Earn Badges</h3>
          <p className="text-muted">Complete lessons, take quizzes, and earn cool badges to show off your new skills!</p>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
          <h3 className="text-2xl mb-2 text-accent" style={{ color: 'var(--accent-dark)' }}>Real Code</h3>
          <p className="text-muted">Build real websites with HTML, CSS, and JS right inside the browser.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
