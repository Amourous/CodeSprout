# 🌱 CodeSprout

**"Learn to build the web, one fun step at a time."**

CodeSprout is a polished, beginner-friendly educational web application specifically designed to teach children and early beginners the fundamentals of web development through short lessons, interactive quizzes, and simple hands-on coding activities.

## 🌟 Features
- **Interactive Lessons**: Bite-sized lessons covering HTML, CSS, and JS fundamentals.
- **Embedded Sandbox**: A built-in code editor for kids to play and experiment with in real time.
- **Quiz System**: End-of-lesson multiple-choice challenges to test learning comprehension.
- **Gamified Dashboard**: Visual progress tracking with earned badges and clear next steps.
- **Kid-Friendly Auth**: Simple authentication flows designed to be understandable.
- **Responsive Design**: Looks great on desktop and mobile devices.

## 🎓 Relevance to Coding Education
This project tackles the unique challenges of teaching programming to beginners. Instead of plunging learners into dry documentation or overwhelming IDEs, CodeSprout breaks down concepts into highly scaffolded micro-activities combined with a dedicated "safe" environment (the Code Playground).

## 🚀 Relevance to a Junior Content Developer Role
CodeSprout demonstrates an ability to:
- Structure a curriculum logically and linearly.
- Write clear, concise, and engaging educational content suitable for early learners.
- Design interactive assessments (quizzes) that validly assess learning goals.
- Build the technical components (React frontend, Supabase backend) needed to deliver and track this educational content.

## 🛠️ Tech Stack
- **Frontend**: React + Vite, React Router DOM
- **Styling**: Vanilla CSS with a Custom Design System
- **Backend/Auth**: Supabase (PostgreSQL, Auth, RLS)
- **Deployment Targets**: Cloudflare Pages

## 💻 Setup Instructions
1. Clone the repository and navigate into it.
2. Run `npm install` to install dependencies.
3. Rename `.env.example` to `.env` and fill in your Supabase details (see below).
4. Run `npm run dev` to start the local development server.

## 🗄️ Supabase Setup Instructions
1. Create a new Supabase Project at [database.new](https://database.new/!).
2. Grab the `Project URL` and `anon key` from your Project Settings -> API.
3. Place these variables into your local `.env` file as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Go to **SQL Editor** in your Supabase dashboard.
5. Create a new query and paste the contents of `supabase/migrations/01_schema.sql` to create the tables.
6. Create another query and paste the contents of `supabase/migrations/02_seed.sql` to load the initial content.

## ☁️ Cloudflare Pages Deployment Notes
1. Connect your Github repository to Cloudflare Pages.
2. Use the following build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
3. Expand **Environment Variables** in the Cloudflare dash and add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Click Save and Deploy.

## 🤖 Optional Cloudflare Worker AI Assistant
*(Coming Soon)* A lightweight, child-safe AI assistant to sit alongside the practice desk and explain lessons using Cloudflare AI/Workers.

To deploy the worker:
1. Create a Cloudflare worker.
2. Bind the worker to `@cf/meta/llama-3-8b-instruct`.
3. Give it a system prompt specialized in explaining code to children in an encouraging manner.

## 🔮 Future Improvements
- **Teacher View**: Develop the teacher dashboard for comprehensive classroom management.
- **Save Code**: Allow users to save their practice desk snippets into Supabase.
- **More Courses**: Expand logic into basic Python and Scratch-like drag-and-drop.
