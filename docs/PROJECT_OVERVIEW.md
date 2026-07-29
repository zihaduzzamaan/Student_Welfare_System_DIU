# DIU Student Welfare System — Project Overview

## Vision Statement
The **Departmental Student Success & Engagement Platform** is a comprehensive digital solution designed for the **Software Engineering (SWE) Department** of **Daffodil International University (DIU)**. It transforms the way students access support, academic information, counselling, and departmental communications into a single, centralized, professional-grade platform.

## Problem Statement
Currently at DIU SWE:
- Students ask questions across fragmented channels: Messenger groups, random seniors, class representatives
- Academic information (BLC guides, exam procedures, transcript collection) is scattered and often lost
- Announcements reach students inconsistently through informal channels
- Counselling requests have no formal digital workflow
- The department has no data-driven insights into student pain points

## Solution
A unified web platform that:
1. **Help Desk** — Centralized ticket-based support system with categorized queries
2. **Academic Information Center** — Curated guides, policies, and FAQ
3. **Announcement Center** — Official notices, events, and opportunities in one feed
4. **Counselling System** — Formal digital workflow for admission, academic, research, and career counselling
5. **Analytics Dashboard** — Data-driven insights for departmental decision-making

## Target Users
| Role | Description | Count (Estimated) |
|---|---|---|
| **Students** | SWE undergraduate students across all semesters | 500–1000+ |
| **Student Welfare Representatives** | Appointed student volunteers who manage support | 5–15 |
| **Admin / HoD** | Department Head and designated administrators | 2–5 |

## Key Impact Areas
- **Reduces repetitive questions by 50%+** through the Academic Info Center and FAQ
- **Improves issue resolution time** through structured ticket workflows
- **Strengthens student leadership** by empowering SW Representatives
- **Provides actionable data** to the HoD for departmental improvements
- **Promotes research & career culture** through counselling integration

## Technical Architecture
- **Frontend:** Vite + React 19 (Compiler) + TypeScript
- **Styling:** Vanilla CSS with CSS Modules, DIU-branded design system
- **Backend (Phase 2):** Supabase (PostgreSQL + Auth + RLS + Realtime)
- **Deployment (TBD):** Vercel / VPS with Docker + Nginx

## Development Phases
| Phase | Scope | Status |
|---|---|---|
| Phase 1A | Project scaffold + Design system + Layout | 🔄 In Progress |
| Phase 1B | Help Desk module | ⬜ Pending |
| Phase 1C | Academic Info Center | ⬜ Pending |
| Phase 1D | Announcements + Counselling | ⬜ Pending |
| Phase 1E | Analytics Dashboard + Auth | ⬜ Pending |
| Phase 1F | Polish & Optimize | ⬜ Pending |
| Phase 2 | Supabase Integration | ⬜ Future |
