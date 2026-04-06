-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  role text default 'student' check (role in ('student', 'teacher', 'parent')),
  experience_points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.profiles enable row level security;
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Courses table (publicly accessible)
create table public.courses (
  id text primary key,
  title text not null,
  description text not null,
  level text not null,
  image_url text,
  order_seq integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.courses enable row level security;
create policy "Courses are viewable by everyone" on public.courses for select using (true);

-- Lessons table
create table public.lessons (
  id text primary key,
  course_id text references public.courses(id) on delete cascade not null,
  title text not null,
  objectives text[] not null,
  content text not null,
  example_code text,
  challenge_desc text,
  challenge_starter_code text,
  order_seq integer not null
);
alter table public.lessons enable row level security;
create policy "Lessons are viewable by everyone" on public.lessons for select using (true);

-- Quiz & Questions
create table public.quizzes (
  id text primary key,
  lesson_id text references public.lessons(id) on delete cascade not null,
  passing_score integer default 60
);
alter table public.quizzes enable row level security;
create policy "Quizzes are viewable by everyone" on public.quizzes for select using (true);

create table public.quiz_questions (
  id text primary key,
  quiz_id text references public.quizzes(id) on delete cascade not null,
  question_text text not null,
  options jsonb not null,
  correct_index integer not null,
  explanation text
);
alter table public.quiz_questions enable row level security;
create policy "Questions are viewable by everyone" on public.quiz_questions for select using (true);

-- User Progress Tracks
create table public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id text references public.lessons(id) on delete cascade not null,
  status text default 'started' check (status in ('started', 'completed')),
  completed_at timestamp with time zone,
  unique(user_id, lesson_id)
);
alter table public.lesson_progress enable row level security;
create policy "Users can view own progress" on public.lesson_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.lesson_progress for update using (auth.uid() = user_id);

-- Seed Data 
insert into public.courses (id, title, description, level, order_seq) values
('html-adventures', 'HTML Adventures', 'Learn the building blocks of the web! Create your first webpage structure.', 'Beginner', 1),
('css-magic', 'CSS Magic', 'Add colors, fonts, and awesome styles to make your pages pop!', 'Beginner', 2),
('javascript-sparks', 'JavaScript Sparks', 'Bring your pages to life with buttons, alerts, and interactive elements.', 'Intermediate', 3)
on conflict do nothing;
