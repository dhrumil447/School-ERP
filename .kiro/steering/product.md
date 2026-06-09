# School ERP – Product Overview

A React-based frontend for a school management system called **Elevate**. It provides role-specific portals for three user types: **Admin**, **Teacher**, and **Student**.

## Core Modules

| Module | Status |
|---|---|
| Authentication (per-role login) | Implemented |
| Admin Dashboard (analytics, stats) | Implemented |
| Student Management | Implemented |
| Attendance Management | Implemented |
| Notices Management | Implemented |
| Student Dashboard | Implemented |
| Teacher Dashboard | Implemented |
| Fee Management | Placeholder |
| Results, Timetable, Library, Transport, Parent Portal | Placeholder |

## User Roles & Access

- **Admin** – Full access to all management modules
- **Teacher** – Dashboard, attendance marking, classes, notices
- **Student** – Dashboard, own attendance, notices, results

## Auth

Mock authentication only (no real backend). Hardcoded demo credentials:
- `admin@schoolerp.demo` / `Admin@123`
- `student@schoolerp.demo` / `Student@123`
- `teacher@schoolerp.demo` / `Teacher@123`

User session is stored in `localStorage`. All protected routes use role-based access control via `ProtectedRoute`.

## Data

All data is static mock data from `src/data/mockData.js`. There is no API integration — all additions, edits, and deletions are in-memory only.
