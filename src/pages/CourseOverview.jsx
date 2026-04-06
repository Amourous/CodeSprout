import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { courseMap } from '../data/courses';

const CourseOverview = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(courseMap[courseId] || null);
  const [lessons, setLessons] = useState(courseMap[courseId]?.lessons || []);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data: lessonData, error } = await supabase
          .from('lessons')
          .select('id, title')
          .eq('course_id', courseId)
          .order('order_seq');
        
        if (!error && lessonData && lessonData.length > 0) {
          setLessons(lessonData);
        }
      } catch (err) {
        console.error('Using fallback data', err);
      }
    };
    fetchCourseData();
  }, [courseId]);

  if (!course) return <div className="container py-8 text-center text-xl">Course not found.</div>;

  return (
    <div className="container py-8 animate-fade-in w-full">
      <Link to="/courses" className="text-secondary mb-4 inline-block font-bold">← Back to Courses</Link>
      
      <div className="card mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span style={{ fontSize: '3rem' }}>{course.icon}</span>
          <h1 className="text-4xl text-primary">{course.title}</h1>
        </div>
        <p className="text-muted text-xl">{course.description}</p>
      </div>

      <h2 className="text-2xl mb-4 text-secondary font-bold">Lessons Breakdown</h2>
      <div className="flex flex-col gap-4">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="card flex justify-between items-center" style={{ padding: '1.5rem' }}>
            <div className="flex items-center gap-4">
              <div className="badge badge-html" style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', borderRadius: '50%' }}>
                {index + 1}
              </div>
              <h3 className="text-xl">{lesson.title}</h3>
            </div>
            <Link to={`/lessons/${lesson.id}`} className="btn btn-primary">Start Lesson</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOverview;
