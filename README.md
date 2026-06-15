<div align="center">

# 🌱 CodeSprout

**"Learn to build the web, one fun step at a time."**

A polished, beginner-friendly educational web app that teaches children and early beginners **HTML, CSS, and JavaScript** through interactive lessons, a built-in code sandbox, gamified quizzes, and an AI-powered coding buddy.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-codesproutweb.netlify.app-brightgreen?style=for-the-badge&logo=netlify)](https://codesproutweb.netlify.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Architecture](#-project-architecture)
- [File Structure](#-file-structure)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
- [Environment Variables](#-environment-variables)
- [Supabase Backend Setup](#️-supabase-backend-setup)
- [Database Schema](#-database-schema)
- [AI Tutor — Cloudflare Worker](#-ai-tutor--cloudflare-worker)
- [Deployment](#-deployment)
- [Application Routes](#-application-routes)
- [Component Reference](#-component-reference)
- [Design System](#-design-system)
- [Future Improvements](#-future-improvements)

---

## 🌟 Overview

CodeSprout is built with the philosophy that learning to code should feel like play. Instead of overwhelming beginners with documentation or intimidating IDEs, CodeSprout breaks down web development concepts into:

- **Scaffolded micro-lessons** with clear objectives and real-world examples
- **An in-browser Code Playground** where learners experiment safely in real time
- **End-of-lesson quizzes** that test comprehension with immediate, encouraging feedback
- **A gamified dashboard** with progress bars and earned badges to celebrate achievements
- **Sprout** — a friendly AI tutor (powered by Cloudflare Workers AI + Llama 3.1) that gives contextual coding hints without ever doing the work for the student

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎮 **Interactive Lessons** | Bite-sized lessons on HTML, CSS, and JavaScript with learning objectives, explanations, and code examples |
| 💻 **Code Playground** | Split-pane editor (HTML / CSS / JS tabs) with a live preview iframe — works on every page and as a standalone practice desk |
| 🧠 **AI Tutor (Sprout)** | A child-safe AI chat assistant embedded in the Code Playground. Powered by Cloudflare Workers AI. Gives hints, not answers |
| 🎵 **Sound Effects** | Gentle Web Audio API sound effects on chat send/receive — no external audio files required |
| 📝 **Quiz System** | Multiple-choice quizzes with per-question feedback and a final score screen |
| 🏆 **Gamified Dashboard** | Progress bars per course, earned badge showcase, and total experience points |
| 🔐 **Authentication** | Supabase Auth with email/password sign-up and sign-in |
| 📱 **Responsive Design** | Works on desktop and mobile with a CSS Grid-based fluid layout |
| 🛡️ **Offline-first Data** | Local fallback data for all courses, lessons, and quizzes — the app works even without a Supabase connection |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI component library |
| [React Router DOM](https://reactrouter.com) | 7 | Client-side routing |
| [Vite](https://vitejs.dev) | 8 | Development server and build tool |
| Vanilla CSS | — | Custom design system (no Tailwind) |
| [Google Fonts — Outfit](https://fonts.google.com/specimen/Outfit) | — | Typography |

### Backend & Auth
| Technology | Purpose |
|---|---|
| [Supabase](https://supabase.com) | PostgreSQL database, Row Level Security (RLS), email/password Auth |

### AI Tutor Worker
| Technology | Purpose |
|---|---|
| [Cloudflare Workers](https://workers.cloudflare.com) | Edge serverless runtime |
| [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) | `@cf/meta/llama-3.1-8b-instruct` inference |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | Worker development & deployment CLI |

### Hosting & Deployment
| Service | Purpose |
|---|---|
| [Netlify](https://netlify.com) | React app hosting (CI/CD via GitHub) |
| [Cloudflare Pages](https://pages.cloudflare.com) | Alternative deployment target |

---

## 🏗 Project Architecture

```
Browser (React SPA)
       │
       ├── React Router  ──► Page Components (9 routes)
       │
       ├── Supabase JS   ──► Supabase Cloud (Auth + PostgreSQL)
       │       └── Fallback: Local static data (src/data/)
       │
       └── fetch()       ──► Cloudflare Worker (AI Tutor)
                                  └── Workers AI (Llama 3.1 8B)
```

The application follows a **fallback-first** data strategy: all courses, lessons, and quizzes are stored locally in `src/data/`. Pages attempt to fetch live data from Supabase on mount; if the request fails or returns empty, the local data is used transparently.

---

## 📁 File Structure

```
CodeSprout-main/
│
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── _redirects          # Netlify SPA routing fix (/* /index.html 200)
│
├── src/
│   ├── assets/             # Static assets
│   │
│   ├── components/
│   │   └── CodePlayground.jsx   # Core editor + live preview + AI chat overlay
│   │
│   ├── data/
│   │   ├── courses.js      # Static course definitions (fallback)
│   │   └── lessons.js      # Static lesson content with code challenges (fallback)
│   │
│   ├── hooks/
│   │   └── useAuth.jsx     # AuthContext provider + useAuth hook (wraps Supabase Auth)
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx  # App shell: sticky navbar + <Outlet /> + footer
│   │
│   ├── lib/
│   │   └── supabaseClient.js   # Supabase client singleton
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx     # Hero + value proposition
│   │   ├── CoursesPage.jsx     # Course catalog grid
│   │   ├── CourseOverview.jsx  # Lesson list for a course
│   │   ├── LessonPage.jsx      # Lesson content + challenge + CodePlayground
│   │   ├── QuizPage.jsx        # Multiple-choice quiz engine
│   │   ├── PracticePage.jsx    # Free-form CodePlayground sandbox
│   │   ├── Dashboard.jsx       # Progress + badges (requires login)
│   │   ├── Login.jsx           # Email/password sign-in
│   │   └── Register.jsx        # Sign-up with username
│   │
│   ├── utils/
│   │   └── sounds.js       # Web Audio API sound effects for the chat UI
│   │
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # App entry point (AuthProvider wrapper)
│   ├── index.css           # Design system tokens + utility classes
│   └── App.css             # App-level overrides
│
├── ai-tutor/               # Cloudflare Worker — Sprout AI backend
│   ├── src/
│   │   └── index.js        # Worker fetch handler + Llama 3.1 call
│   ├── wrangler.toml       # Worker config (name, AI binding)
│   └── package.json
│
├── supabase/
│   └── migrations/
│       ├── 01_schema.sql   # Table definitions + RLS policies
│       └── 02_seed.sql     # Initial course/lesson/quiz seed data
│
├── .env.example            # Environment variable template
├── .env                    # Local secrets (git-ignored)
├── index.html              # Vite HTML entry point
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
└── package.json
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org) v18 or later
- npm v9 or later

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/codesprout.git
cd codesprout

# 2. Install dependencies
npm install

# 3. Copy the environment template
cp .env.example .env
# Then open .env and fill in your Supabase credentials (see below)

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port).

> **Note:** The app works without a Supabase connection using local fallback data. You only need Supabase credentials if you want authentication and live database content.

---

## 🔑 Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
# Your Supabase project URL (found in Project Settings → API)
VITE_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"

# Your Supabase anon/public key (found in Project Settings → API)
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# The deployed URL of your Cloudflare AI Tutor Worker
VITE_TUTOR_URL="https://codesprout-tutor.YOUR_ACCOUNT.workers.dev"
```

> ⚠️ **Important:** Variables prefixed with `VITE_` are embedded into the client bundle at build time by Vite. They are **not secret** — do not store private API keys here. The Supabase `anon` key is designed to be public; Row Level Security (RLS) policies on the database protect your data.

---

## 🗄️ Supabase Backend Setup

If you want to run the full app with live auth and database content, follow these steps:

### 1. Create a project
Go to [https://database.new](https://database.new) and create a new Supabase project. Note your **Project URL** and **anon key**.

### 2. Apply the schema
In the Supabase dashboard, open **SQL Editor** and run the contents of:

```
supabase/migrations/01_schema.sql
```

This creates the following tables with RLS policies:
- `profiles` — linked to Supabase Auth users
- `courses` — course metadata
- `lessons` — lesson content and code challenges
- `quizzes` — quiz metadata (linked to lessons)
- `quiz_questions` — individual questions with options and answers
- `lesson_progress` — per-user lesson completion tracking

### 3. Seed initial data
Run the contents of:

```
supabase/migrations/02_seed.sql
```

This inserts the starter courses (HTML Adventures, CSS Magic, JavaScript Sparks), sample lessons, and a sample quiz with questions.

### 4. Enable email confirmation (optional)
By default, Supabase requires email confirmation on sign-up. During development you can disable this in **Authentication → Email → Confirm email**.

---

## 📐 Database Schema

```
auth.users (managed by Supabase)
    │
    └── profiles (1:1)
          id, username, role, experience_points

courses
    │
    └── lessons (1:many)
              │
              ├── lesson_progress (1:many, per user)
              │
              └── quizzes (1:1)
                      │
                      └── quiz_questions (1:many)
```

### Row Level Security Summary

| Table | Read | Write |
|---|---|---|
| `courses` | Public | Admins only |
| `lessons` | Public | Admins only |
| `quizzes` | Public | Admins only |
| `quiz_questions` | Public | Admins only |
| `profiles` | Own row only | Own row only |
| `lesson_progress` | Own rows only | Own rows only |

---

## 🤖 AI Tutor — Cloudflare Worker

The **Sprout** AI assistant is a separate Cloudflare Worker located in the `ai-tutor/` directory. It acts as a child-safe proxy to Cloudflare Workers AI.

### How it works
1. The `CodePlayground` component sends a `POST` request to the Worker URL with `{ message, code }`.
2. The Worker builds a system prompt that includes the user's current code as context.
3. It calls `env.AI.run("@cf/meta/llama-3.1-8b-instruct", { messages })`.
4. The AI response is returned as `{ response: "..." }` JSON.

### System prompt rules
The worker's system prompt enforces these child-safe behaviours:
- Speak cheerfully, use emojis
- Provide **hints only** — never write complete code for the student
- Redirect off-topic questions back to coding
- Keep responses under 3 sentences

### Local development

> Requires a Cloudflare account and `wrangler` authentication.

```bash
cd ai-tutor
npm install

# Log in to your Cloudflare account
npx wrangler login

# Start the local development server (uses real remote AI binding)
npm run dev
```

### Deploying the Worker

```bash
cd ai-tutor
npm run deploy
```

After deployment, copy the Worker URL (e.g. `https://codesprout-tutor.YOUR_ACCOUNT.workers.dev`) into your `.env` file as `VITE_TUTOR_URL`.

---

## ☁️ Deployment

### Netlify (Recommended)

1. Push this repository to GitHub.
2. Log in to [Netlify](https://netlify.com) and click **Add new site → Import from Git**.
3. Select your repository and configure the build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Site configuration → Environment variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_TUTOR_URL`
5. Click **Deploy site**.

> The `public/_redirects` file is already included in this repository. It tells Netlify to always serve `index.html` for all routes, enabling React Router to handle navigation correctly. Without it, direct URL access (e.g. `/login`) returns a 404.

### Cloudflare Pages (Alternative)

1. Connect your GitHub repository to Cloudflare Pages.
2. Use the following build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Add the same environment variables under **Settings → Environment variables**.

---

## 🗺 Application Routes

| Path | Component | Description | Auth Required |
|---|---|---|---|
| `/` | `LandingPage` | Hero section + value propositions | No |
| `/courses` | `CoursesPage` | Full course catalog | No |
| `/courses/:courseId` | `CourseOverview` | Lesson list for a specific course | No |
| `/lessons/:lessonId` | `LessonPage` | Lesson content + code challenge | No |
| `/quiz/:lessonId` | `QuizPage` | Multiple-choice quiz | No |
| `/practice` | `PracticePage` | Free-form Code Playground sandbox | No |
| `/dashboard` | `Dashboard` | Progress tracking + badges | Yes (shows prompt) |
| `/login` | `Login` | Email/password sign-in | No |
| `/register` | `Register` | New account creation | No |

---

## 🧩 Component Reference

### `CodePlayground`
**Path:** `src/components/CodePlayground.jsx`

The core interactive component. Renders a split-pane editor/preview layout with an integrated AI chat overlay.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialHtml` | `string` | `''` | Starter HTML code for the editor |
| `initialCss` | `string` | `''` | Starter CSS code |
| `initialJs` | `string` | `''` | Starter JavaScript code |

**Features:**
- Three-tab editor (HTML / CSS / JS) with `<textarea>` inputs
- Live `<iframe>` preview via `srcDoc` — re-renders on every keystroke
- Sandboxed iframe (`sandbox="allow-scripts allow-modals"`)
- Floating 🌱 FAB button that opens the Sprout AI chat overlay
- Chat UI with message bubbles, typing indicator, and Web Audio sound effects
- Chat input supports both button click and `Enter` key to send

### `useAuth` hook
**Path:** `src/hooks/useAuth.jsx`

Provides authentication state and methods via React Context.

**Exported values:**

| Value | Type | Description |
|---|---|---|
| `user` | `object \| null` | Current Supabase auth user object |
| `loading` | `boolean` | True while session is being fetched on load |
| `signIn(data)` | `function` | Calls `supabase.auth.signInWithPassword(data)` |
| `signUp(data)` | `function` | Calls `supabase.auth.signUp(data)` |
| `signOut()` | `function` | Signs the current user out |

### `MainLayout`
**Path:** `src/layouts/MainLayout.jsx`

The persistent app shell. Contains:
- A sticky top navbar with the CodeSprout logo, nav links, and a dynamic **Log In / Log Out** button
- `<Outlet />` for nested route content
- A simple footer with copyright year

---

## 🎨 Design System

CodeSprout uses a **custom vanilla CSS design system** defined in `src/index.css`. All design tokens are CSS custom properties on `:root`.

### Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#FF6B6B` | Buttons, headings, links |
| `--primary-dark` | `#FF4F4F` | Button shadows, hover states |
| `--secondary` | `#4ECDC4` | Teal accents, secondary buttons |
| `--accent` | `#FFE66D` | Yellow highlights, JS badge |
| `--background` | `#F7F9FC` | Page background |
| `--surface` | `#FFFFFF` | Card backgrounds |
| `--text-main` | `#2B2D42` | Primary text |
| `--text-muted` | `#8D99AE` | Secondary/helper text |
| `--success` | `#6BCB77` | Correct answer indicators |
| `--error` | `#FF6B6B` | Wrong answer indicators |

### Typography
- **Font family:** [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)
- **Heading weight:** 800
- **Base font size:** 16px

### Key Component Classes

| Class | Description |
|---|---|
| `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` | Pill-shaped buttons with press animation |
| `.card` | White rounded surface with hover lift effect |
| `.badge`, `.badge-html`, `.badge-css`, `.badge-js` | Coloured pill labels |
| `.input-field` | Styled form inputs with teal focus ring |
| `.navbar` | Sticky top navigation bar |
| `.animate-fade-in` | 0.4s fade-in entry animation |
| `.animate-bounce-slow` | Gentle floating bounce (used on hero heading) |
| `.container` | Centred max-width wrapper (1200px) |

---

## 🔮 Future Improvements

- [ ] **Teacher Dashboard** — View student progress, assign courses, manage classes
- [ ] **Save Playground Code** — Persist Code Playground snippets to Supabase per user
- [ ] **Real Progress Tracking** — Write lesson completion to `lesson_progress` table on quiz pass
- [ ] **More Courses** — Basic Python, Scratch-like drag-and-drop blocks
- [ ] **Dark Mode** — Toggle between light and dark themes
- [ ] **Code Hints** — Inline syntax highlighting in the code editor (CodeMirror or Monaco)
- [ ] **Certificate Generator** — Downloadable PDF certificate on course completion
- [ ] **Parent View** — Separate read-only dashboard for parents to monitor child progress
- [ ] **Accessibility Audit** — Full WCAG 2.1 AA compliance review

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to fork and build upon it for educational purposes.

---

<div align="center">
  Made with ❤️ for curious young coders everywhere 🌱
</div>
