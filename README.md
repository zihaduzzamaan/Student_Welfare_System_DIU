# DIU Student Welfare System

A centralized departmental portal for the **Department of Software Engineering** at **Daffodil International University**, built to streamline student support workflows — covering help desk ticketing, academic resources, faculty counselling, and administrative announcements under one unified platform.

**Live Site →** https://zihaduzzamaan.github.io/Student_Welfare_System-DIU-/

---

## Overview

Managing student concerns across multiple disconnected channels (email, in-person visits, manual spreadsheets) created friction for both students and faculty. This system addresses that by providing a structured, role-aware web portal where students can raise tickets, book counselling sessions, browse academic guides, and stay informed through department announcements — all in one place.

The platform enforces a three-tier role model (Student, SW Representative, Admin/HoD), so each user sees only the tools and data relevant to their responsibilities.

---

## Features

### Help Desk
- Students submit support tickets categorized by issue type (Academic, BLC, Exam, Registration, Accounts, Transcript, Student Portal, Welfare)
- Representatives and admins manage ticket queues, update statuses, assign handlers, and respond via threaded replies
- Status tracking: `Open → In Progress → Resolved / Escalated`

### Counselling Requests
- Students request 1-on-1 sessions with faculty across four counselling types: Admission, Academic, Research, and Career
- Representatives schedule, accept, or decline requests with preferred date/time handling
- Full session history visible per student

### Academic Information Center
- Structured guides for freshman onboarding, academic policies, and departmental procedures
- Filterable FAQ with view count tracking
- Quick-access reference cards for credit systems, CGPA policies, and course registration rules

### Announcements
- Admins and representatives publish categorized notices (Exam, Workshop, Seminar, Competition, Scholarship, Internship)
- Pin-to-top support for critical announcements
- All users receive a consistent feed filtered by department

### Analytics Dashboard
- Admin-only view with ticket volume trends, category breakdown, counselling request pipeline, and unresolved issue counts
- Monthly trend charts and top-problem identification

### Auth & Role Management
- Unified login/register flow with smooth GPU-accelerated panel transitions
- Role-aware navigation — sidebar and menu items are conditionally rendered based on the authenticated user's role
- In-session role switching (for testing/demo purposes)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Routing | React Router v7 |
| Icons | Heroicons v2, Lucide React |
| Styling | CSS Modules (Vanilla CSS) |
| Compiler | React Compiler (babel plugin) |
| Linting | Oxlint |
| Deployment | GitHub Pages via `gh-pages` |

---

## Project Structure

```
src/
├── assets/
│   └── styles/
│       ├── variables.css       # Design tokens (colors, spacing, typography)
│       ├── global.css          # Base resets and body defaults
│       ├── reset.css           # Normalize styles
│       └── animations.css      # Shared keyframe animations
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       # Shell with sidebar + navbar
│   │   ├── Navbar.tsx          # Top bar with profile dropdown & mobile menu
│   │   ├── Sidebar.tsx         # Role-filtered navigation drawer
│   │   └── AuthGuard.tsx       # Route protection wrapper
│   ├── shared/
│   │   ├── FAQAccordion.tsx    # Expandable FAQ component with view tracking
│   │   ├── TicketCard.tsx      # Reusable ticket list item
│   │   └── AnnouncementCard.tsx
│   └── ui/
│       └── DIULogo.tsx         # Brand logo — SVG shield icon + full banner mode
│
├── pages/
│   ├── auth/                   # Unified login/register (shared AuthPage)
│   ├── academic/               # AcademicCenter, FreshmanGuide, AcademicPolicies, FAQ
│   ├── announcements/          # Announcements feed + CreateAnnouncement form
│   ├── counselling/            # RequestCounselling (student) + ManageCounselling (staff)
│   ├── dashboard/              # AnalyticsDashboard (admin only)
│   ├── helpdesk/               # SubmitTicket, MyTickets, ManageTickets
│   └── HomePage.tsx            # Role-aware dashboard landing page
│
├── hooks/
│   ├── useAuth.tsx             # Authentication state and role management
│   ├── useTickets.ts           # Ticket CRUD operations
│   ├── useAnnouncements.ts     # Announcement feed management
│   └── useCounselling.ts      # Counselling request lifecycle
│
├── data/                       # Mock data layer (replaceable with real API/DB)
├── types/index.ts              # All TypeScript interfaces and union types
├── utils/
│   ├── constants.ts            # App-wide enums, categories, status configs
│   └── helpers.ts              # Utility functions
└── router.tsx                  # Hash-based SPA routing with lazy loading
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/zihaduzzamaan/Student_Welfare_System-DIU-.git
cd Student_Welfare_System-DIU-
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Output goes to `dist/`. Preview locally with:

```bash
npm run preview
```

---

## Deployment

The project deploys to GitHub Pages using the `gh-pages` package.

```bash
npm run deploy
```

This runs `npm run build` first (via `predeploy`), then pushes the `dist/` folder to the `gh-pages` branch. The live site updates within ~2 minutes.

**Routing note:** The app uses `createHashRouter` (`/#/path`) to avoid 404s on direct URL access in GitHub Pages static hosting.

---

## User Roles

| Role | Access |
|---|---|
| `student` | Submit tickets, request counselling, browse academic guides and announcements |
| `representative` | All student access + manage tickets, manage counselling requests, post announcements |
| `admin` | All representative access + analytics dashboard, full ticket/counselling oversight |

---

## Demo Credentials

The current build uses a local mock data layer. Any email/password combination works for login. To switch roles, use the role switcher inside the profile dropdown after logging in.

---

## Roadmap

- [ ] Supabase integration — persistent database replacing mock data layer
- [ ] Real-time ticket status updates via Supabase Realtime
- [ ] Email notification system for ticket replies and counselling confirmations
- [ ] File attachment support on tickets
- [ ] Student ID verification against university database
- [ ] Mobile-native PWA with push notifications

---

## Contributing

This is a departmental project maintained by the Software Engineering department at DIU. If you're a student or faculty member and would like to suggest a feature or report a bug, open an issue on this repository.

---

## License

This project is intended for internal use by the Department of Software Engineering, Daffodil International University. Not licensed for redistribution.
