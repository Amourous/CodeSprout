import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { lessonsMap } from '../data/lessons';
import CodePlayground from '../components/CodePlayground';

const LessonPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(lessonsMap[lessonId] || null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();
        if (!error && data) {
          setLesson(data);
        }
      } catch (err) {
        console.error('Using fallback data', err);
      }
    };
    fetchLessonData();
  }, [lessonId]);

  if (!lesson) return <div className="container py-8 text-center text-xl">Lesson not found.</div>;

  return (
    <div className="container py-8 flex flex-col gap-6 animate-fade-in w-full">
      <Link to={`/courses/${lesson.course_id}`} className="text-secondary font-bold">← Back to Course</Link>
      
      <div className="card">
        <h1 className="text-4xl text-primary mb-4">{lesson.title}</h1>
        
        <h3 className="text-xl font-bold mb-2">In this lesson, you will:</h3>
        <ul className="mb-6" style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
          {lesson.objectives?.map((obj, i) => (
            <li key={i} className="text-muted text-lg">{obj}</li>
          ))}
        </ul>

        <div className="mb-6" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          <p>{lesson.content}</p>
        </div>

        <div className="mb-8" style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-dark)' }}>
          <h4 className="text-lg font-bold mb-2">Example:</h4>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}><code>{lesson.example_code}</code></pre>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl text-secondary mb-4">Your Turn: Practice Challenge!</h2>
        <p className="text-lg mb-6">{lesson.challenge_desc}</p>
        <CodePlayground 
          initialHtml={lesson.challenge_html || lesson.challenge_starter_code || ''} 
          initialCss={lesson.challenge_css || ''}
          initialJs={lesson.challenge_js || ''}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link to={`/quiz/${lessonId}`} className="btn btn-secondary text-xl">Take the Quiz!</Link>
      </div>
    </div>
  );
};

export default LessonPage;
