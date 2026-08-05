# 📋 **Acadex Platform — Detailed Task Tracker**

> **Project Root**: `c:\Users\ZISHAN\Desktop\WORK\Student Welfare System`  
> **Status**: Successfully Implemented & Operational  
> **Backend**: XAMPP MySQL + Express REST API (`acadex_db`)  
> **Target Version**: Acadex v1.0  
> **Last Updated**: 2026-08-05  

---

## 🗄️ **Phase 0: Database & Backend Foundation (P0 Foundation)**
- [x] **Task 0.1**: Create `server/schema.sql` defining MySQL database tables (`users`, `tickets`, `counselling_requests`, `announcements`, `documents`).
- [x] **Task 0.2**: Create Node.js + Express backend server (`server/index.js`) with MySQL connection pool.
- [x] **Task 0.3**: Build frontend API service layer (`src/services/api.ts`) connecting UI components to backend endpoints with fallback offline engine.

---

## 🎯 **Phase 1: Security, Role Switching & Auth Core (P0 Critical)**
- [x] **Task 1.1**: Remove Admin login tab/cards from public `AuthPage.tsx`.
- [x] **Task 1.2**: Create dedicated `/admin/login` route in `router.tsx` and build `AdminLoginPage.tsx`.
- [x] **Task 1.3**: Update `AuthPage.tsx` for Student vs. Guest (Alumni / Non-DIU Guest) selection with tooltips and active card visual state transitions.
- [x] **Task 1.4**: Refactor `useAuth.tsx` to preserve `originalUser` session when switching role views, preventing session loss.
- [x] **Task 1.5**: Enforce DIU Google OAuth account restriction (`@diu.edu.bd` / `@daffodilvarsity.edu.bd`).
- [x] **Task 1.6**: Create Non-DIU Guest limited-access view & Guest Ticket Lookup system (`GuestTicketLookup.tsx`).

---

## 🎨 **Phase 2: Navigation & Acadex Rebranding (P1 / P2)**
- [x] **Task 2.1**: Rebrand UI strings, page titles, footer, and metadata from "DIU SWS" to **Acadex**.
- [x] **Task 2.2**: Update `HomePage.tsx` Hero section copy and add primary/secondary CTA buttons.
- [x] **Task 2.3**: Upgrade `Navbar.tsx` & build Mobile Hamburger Drawer (☰) + Top Search Bar / Spotlight Search (`Ctrl+K`).

---

## 👤 **Phase 3: Registration & Profile Management (P1 / P2)**
- [x] **Task 3.1**: Update `AuthPage.tsx` Registration flow: remove Guest signup, enforce mandatory Student ID for Student & Alumni.
- [x] **Task 3.2**: Enhance Password Confirmation with Show/Hide toggle, match validator, and strength indicator.
- [x] **Task 3.3**: Create `EditProfile.tsx` page in `src/pages/dashboard/EditProfile.tsx` supporting 10+ user fields with locked academic fields and avatar file handling.
- [x] **Task 3.4**: Add `/dashboard/edit-profile` route in `router.tsx` and connect to Profile card in App Layout.

---

## ⚡ **Phase 4: Optimization, Verification & Polish (P1)**
- [x] **Task 4.1**: Perform responsive UI audit across mobile, tablet, and desktop viewports.
- [x] **Task 4.2**: Audit theme transitions and ensure 90 FPS smooth GPU animations (`Auth.module.css`).
- [x] **Task 4.3**: Run TypeScript build check (`npm run build`) and update task tracker status.

---

## 📊 **Progress Metrics**
- **Total Tasks**: 19
- **Completed**: 19 / 19 (100%)
- **Status**: ALL PHASES COMPLETED
