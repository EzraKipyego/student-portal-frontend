# Student Management Portal — Frontend

React + Tailwind CSS frontend for the Student Management Portal, styled to
match the reference student portal screenshot (dark navy sidebar, coral
accent, welcome banner, quick actions, calendar + news panel).

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Log in with any email/password — auth is
currently mocked in `src/context/AuthContext.jsx` so the UI can be built and
demoed before the Django REST backend is live.

## What's here

- `src/pages/Login.jsx` — sign-in screen
- `src/pages/Dashboard.jsx` — welcome banner, quick actions, courses list,
  mini calendar, news & updates (mirrors the reference screenshot)
- `src/pages/Courses.jsx`, `Grades.jsx`, `Attendance.jsx`, `Timetable.jsx`,
  `Announcements.jsx`, `Payments.jsx`, `Profile.jsx` — stub pages wired into
  routing, ready to be filled in
- `src/components/Sidebar.jsx`, `Topbar.jsx`, `AppLayout.jsx` — shared shell
- `src/context/AuthContext.jsx` — JWT token storage + login/logout, currently
  mocked
- `src/data/mockData.js` — placeholder data standing in for the API

## Next steps (matches the mentor's whiteboard requirements)

1. **Authentication/Authorization** — swap the mocked `login()` call for
   `POST /api/auth/login/` (JWT) against the Django REST API; store the
   access/refresh tokens and add an axios/fetch wrapper that attaches the
   `Authorization: Bearer <token>` header and refreshes on expiry.
2. **Django REST API** — build the endpoints for students, courses,
   enrollments, grades, attendance, timetable, announcements, and payments
   (at least 5 schemas, per the requirement).
3. **Dockerize** — separate Dockerfiles for frontend, backend, and database,
   tied together with docker-compose.
4. **GitHub Actions** — CI to lint/test on push, CD to deploy frontend
   (Vercel) and backend (Render).
5. **Kanban board** — track these tasks (e.g. GitHub Projects/Trello).
6. **ER diagram** — model the schemas above before/while building the API.

## Tech stack

- React 18 + React Router
- Tailwind CSS v4 (via the `@tailwindcss/vite` plugin) using **only default
  utilities** — `src/index.css` is just `@import "tailwindcss";`, no custom
  theme. The sidebar/dark accents use built-in `slate` shades and the coral
  accent uses built-in `orange` shades (closest defaults to the original
  custom `navy`/`brand` palette). Cards use the default `shadow` and
  `rounded-2xl` utilities in place of the old custom `shadow-card` /
  `rounded-xl2`.
- lucide-react icons
- Vite
