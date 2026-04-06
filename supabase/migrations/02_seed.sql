-- Seed HTML Lessons
insert into public.lessons (id, course_id, title, objectives, content, example_code, challenge_desc, challenge_starter_code, order_seq) values
('html-l1', 'html-adventures', 'What is HTML?', array['Understand what HTML stands for', 'Learn how HTML gives structure to a page'], 'HTML stands for HyperText Markup Language. It''s like the skeleton of a webpage! Every webpage you visit is built with HTML tags.', '<h1>Hello World!</h1>', 'Create your own heading that says your name!', '<!-- Type your heading below! -->', 1),
('html-l2', 'html-adventures', 'Headings and Paragraphs', array['Learn h1 to h6 tags', 'Learn the p tag'], 'Headings use tags from h1 (biggest) to h6 (smallest). Paragraphs use the p tag. They help separate text so it''s easy to read.', '<h1>My Favorite Animal</h1><p>I love dogs because they are friendly.</p>', 'Write a heading and a short paragraph about your favorite food.', '<!-- Write your HTML here! -->', 2)
on conflict do nothing;

-- Seed CSS Lessons
insert into public.lessons (id, course_id, title, objectives, content, example_code, challenge_desc, challenge_starter_code, order_seq) values
('css-l1', 'css-magic', 'What is CSS?', array['Understand what CSS does', 'Learn how to change text color'], 'CSS stands for Cascading Style Sheets. If HTML is the skeleton, CSS is the clothes! We use it to make things look beautiful.', 'h1 { color: red; }', 'Change the color of the heading to blue.', 'h1 {\n  color: black;\n}', 1)
on conflict do nothing;

-- Seed JS Lessons
insert into public.lessons (id, course_id, title, objectives, content, example_code, challenge_desc, challenge_starter_code, order_seq) values
('js-l1', 'javascript-sparks', 'Variables and Text', array['Learn how to store text in variables', 'Show variables in alerts'], 'Variables are like small boxes where you can store information, like your name or your score.', 'let myName = "Sprout";\nalert(myName);', 'Create a variable called myFavoriteGame and alert it!', 'let myFavoriteGame = "";\n', 1)
on conflict do nothing;

-- Seed Quizzes
insert into public.quizzes (id, lesson_id, passing_score) values
('q-html-1', 'html-l1', 100)
on conflict do nothing;

insert into public.quiz_questions (id, quiz_id, question_text, options, correct_index, explanation) values
('qq-html-1-1', 'q-html-1', 'What does HTML stand for?', '["HyperText Markup Language", "HighText Machine Learning", "Home Tool Markup Language"]', 0, 'HTML stands for HyperText Markup Language.'),
('qq-html-1-2', 'q-html-1', 'Is HTML the skeleton or the clothes of a webpage?', '["Skeleton", "Clothes", "Brain"]', 0, 'HTML provides structure, making it the skeleton.')
on conflict do nothing;
