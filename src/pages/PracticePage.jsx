import React from 'react';
import CodePlayground from '../components/CodePlayground';

const PracticePage = () => {
  return (
    <div className="container py-8 flex flex-col gap-4 animate-fade-in w-full h-full" style={{ minHeight: '80vh' }}>
      <div className="text-center mb-4">
        <h1 className="text-4xl text-primary mb-2">Practice Desk</h1>
        <p className="text-lg text-muted">Use this sandbox to try out any HTML or CSS you want!</p>
      </div>
      <div style={{ flexGrow: 1 }}>
        <CodePlayground />
      </div>
    </div>
  );
};

export default PracticePage;
