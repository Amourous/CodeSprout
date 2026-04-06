import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const fallbackQuizzes = {
  // HTML
  'html-l1': { id: 'q-html-1', lesson_id: 'html-l1', questions: [{ id: 'qq1', question_text: 'What does HTML stand for?', options: ["HyperText Markup Language", "HighText Machine Learning", "Home Tool Markup Language"], correct_index: 0, explanation: 'HTML stands for HyperText Markup Language.' }] },
  'html-l2': { id: 'q-html-2', lesson_id: 'html-l2', questions: [{ id: 'qq2', question_text: 'Which tag is for the biggest heading?', options: ["<p>", "<h6>", "<h1>"], correct_index: 2, explanation: '<h1> is the largest heading.' }] },
  'html-l3': { id: 'q-html-3', lesson_id: 'html-l3', questions: [{ id: 'qq3', question_text: 'Which tag creates a link?', options: ["<link>", "<a>", "<go>"], correct_index: 1, explanation: 'We use the "a" (anchor) tag.' }] },
  'html-l4': { id: 'q-html-4', lesson_id: 'html-l4', questions: [{ id: 'qq4', question_text: 'What attribute tells an img tag where the picture is?', options: ["href", "src", "link"], correct_index: 1, explanation: 'src stands for source!' }] },
  'html-l5': { id: 'q-html-5', lesson_id: 'html-l5', questions: [{ id: 'qq5', question_text: 'Which tag makes an unordered (bulleted) list?', options: ["<ul>", "<ol>", "<li>"], correct_index: 0, explanation: '<ul> stands for Unordered List!' }] },

  // CSS
  'css-l1': { id: 'q-css-1', lesson_id: 'css-l1', questions: [{ id: 'qqc1', question_text: 'What is CSS used for?', options: ["Making logic", "Styling the page", "Saving data"], correct_index: 1, explanation: 'CSS adds styles.' }] },
  'css-l2': { id: 'q-css-2', lesson_id: 'css-l2', questions: [{ id: 'qqc2', question_text: 'Which property changes the background color?', options: ["color", "bg-color", "background-color"], correct_index: 2, explanation: 'It is background-color.' }] },
  'css-l3': { id: 'q-css-3', lesson_id: 'css-l3', questions: [{ id: 'qqc3', question_text: 'What does padding do?', options: ["Adds space outside", "Adds space inside", "Changes font size"], correct_index: 1, explanation: 'Padding adds space inside the border.' }] },
  'css-l4': { id: 'q-css-4', lesson_id: 'css-l4', questions: [{ id: 'qqc4', question_text: 'How do you make a circle?', options: ["border-radius: 50%;", "circle: true;", "border: round;"], correct_index: 0, explanation: 'border-radius 50% curves it into a circle!' }] },

  // JS
  'js-l1': { id: 'q-js-1', lesson_id: 'js-l1', questions: [{ id: 'qqj1', question_text: 'What keyword creates a variable?', options: ["var", "let", "make"], correct_index: 1, explanation: 'We use "let".' }] },
  'js-l2': { id: 'q-js-2', lesson_id: 'js-l2', questions: [{ id: 'qqj2', question_text: 'What symbol multiplies numbers?', options: ["x", "X", "*"], correct_index: 2, explanation: 'The * (asterisk) is used for multiplication.' }] },
  'js-l3': { id: 'q-js-3', lesson_id: 'js-l3', questions: [{ id: 'qqj3', question_text: 'What statement allows JS to make decisions?', options: ["why", "how", "if"], correct_index: 2, explanation: 'if statements let JS decide!' }] },
  'js-l4': { id: 'q-js-4', lesson_id: 'js-l4', questions: [{ id: 'qqj4', question_text: 'What makes a block of code reusable?', options: ["A function", "A variable", "An if statement"], correct_index: 0, explanation: 'Functions are reusable blocks of code.' }] },
  'js-l5': { id: 'q-js-5', lesson_id: 'js-l5', questions: [{ id: 'qqj5', question_text: 'Which HTML attribute runs JS when clicked?', options: ["onhover", "onclick", "onrun"], correct_index: 1, explanation: 'onclick catches the user clicking!' }] },
};

const QuizPage = () => {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(fallbackQuizzes[lessonId] || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  useEffect(() => {
    // Standard Supabase load could go here for production
  }, [lessonId]);

  if (!quiz) return <div className="container py-8 text-center text-xl">Quiz not found for this lesson yet! Coming soon.</div>;

  const question = quiz.questions[currentQuestionIndex];

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    if (selectedAnswer === question.correct_index) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(curr => curr + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const passed = score === quiz.questions.length;
    return (
      <div className="container py-16 flex flex-col items-center animate-fade-in w-full text-center">
        <h1 className="text-4xl text-primary mb-4">{passed ? 'Fantastic Job! 🌟' : 'Good Try! 👏'}</h1>
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <p className="text-2xl mb-4">You scored {score} out of {quiz.questions.length}!</p>
          {passed ? (
            <p className="text-muted mb-6">You really know your stuff. Ready for the next challenge?</p>
          ) : (
            <p className="text-muted mb-6">Review the lesson and try again to get a perfect score!</p>
          )}
          <div className="flex flex-col gap-4">
            {passed && <Link to={`/courses`} className="btn btn-primary w-full">Back to Courses</Link>}
            {!passed && <button onClick={() => { setShowResult(false); setCurrentQuestionIndex(0); setScore(0); }} className="btn btn-secondary w-full">Try Again</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16 flex justify-center animate-fade-in w-full">
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="flex justify-between items-center mb-6 text-muted font-bold">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span className="badge badge-js text-black">Score: {score}</span>
        </div>
        
        <h2 className="text-2xl mb-6">{question.question_text}</h2>
        
        <div className="flex flex-col gap-3 mb-6">
          {question.options.map((opt, i) => {
            let btnClass = "btn btn-outline justify-start text-left w-full";
            if (isAnswerChecked) {
              if (i === question.correct_index) btnClass = "btn w-full justify-start text-left text-white";
              else if (i === selectedAnswer && i !== question.correct_index) btnClass = "btn btn-primary w-full justify-start text-left";
            } else if (selectedAnswer === i) {
              btnClass = "btn btn-secondary text-white justify-start text-left w-full";
            }
            return (
              <button 
                key={i} 
                onClick={() => !isAnswerChecked && setSelectedAnswer(i)}
                className={btnClass}
                style={{ ...(isAnswerChecked && i === question.correct_index ? { backgroundColor: 'var(--success)' } : {}) }}
                disabled={isAnswerChecked}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {isAnswerChecked && (
          <div className="mb-6" style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: `4px solid ${selectedAnswer === question.correct_index ? 'var(--success)' : 'var(--error)'}` }}>
            <p className="font-bold mb-1">{selectedAnswer === question.correct_index ? 'Correct! 🎉' : 'Not quite! 💡'}</p>
            <p className="text-muted">{question.explanation}</p>
          </div>
        )}

        {isAnswerChecked ? (
          <button onClick={handleNextQuestion} className="btn btn-primary w-full">
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        ) : (
          <button onClick={handleCheckAnswer} disabled={selectedAnswer === null} className="btn btn-primary w-full">
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
