import React from 'react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  const courses = [
    {
      id: 'html-adventures',
      title: 'HTML Adventures',
      description: 'Learn the building blocks of the web! Create your first webpage structure.',
      level: 'Beginner',
      lessons: 4,
      badge: 'badge-html',
      icon: '🏗️'
    },
    {
      id: 'css-magic',
      title: 'CSS Magic',
      description: 'Add colors, fonts, and awesome styles to make your pages pop!',
      level: 'Beginner',
      lessons: 4,
      badge: 'badge-css',
      icon: '🎨'
    },
    {
      id: 'javascript-sparks',
      title: 'JavaScript Sparks',
      description: 'Bring your pages to life with buttons, alerts, and interactive elements.',
      level: 'Intermediate',
      lessons: 4,
      badge: 'badge-js',
      icon: '⚡'
    }
  ];

  return (
    <div className="container py-8 animate-fade-in w-full">
      <h1 className="text-4xl text-primary mb-2 text-center">Course Catalog</h1>
      <p className="text-center text-muted mb-8">Pick a course and start your coding journey today!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="card flex flex-col justify-between" style={{ minHeight: '300px' }}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span style={{ fontSize: '2.5rem' }}>{course.icon}</span>
                <span className={`badge ${course.badge}`}>{course.level}</span>
              </div>
              <h3 className="text-2xl mb-2">{course.title}</h3>
              <p className="text-muted mb-4">{course.description}</p>
            </div>
            
            <div className="flex flex-col gap-4 mt-4 text-sm font-semibold">
              <span className="text-secondary">{course.lessons} Lessons</span>
              <Link to={`/courses/${course.id}`} className="btn btn-secondary w-full">View Course Options</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
