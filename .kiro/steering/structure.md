# Project Structure

```
src/
├── main.jsx                  # App entry point: router config, context providers, all routes
├── index.css                 # Global resets, scrollbar styles, CSS custom properties
├── lib.js                    # cn() utility (clsx + tailwind-merge)
│
├── context/
│   ├── AuthContext.jsx       # useAuth hook — user state, login(), logout(), isAuthenticated
│   └── ThemeContext.jsx      # useTheme hook — isDarkMode, toggleTheme(); wraps MUI ThemeProvider
│
├── components/
│   ├── ProtectedRoute.jsx    # Role-based route guard; redirects to "/" if unauth or wrong role
│   ├── layout/
│   │   └── AppShell.jsx      # Persistent layout: sidebar drawer + AppBar + <Outlet />
│   └── ui/                   # Reusable Tailwind-based primitives
│       ├── Button.jsx        # variant: primary | secondary | ghost | danger; size: sm | md | lg
│       ├── Card.jsx          # Card, CardHeader, CardTitle
│       ├── Input.jsx
│       ├── Modal.jsx
│       └── Skeleton.jsx
│
├── pages/
│   ├── Landing.jsx           # Public landing/home page
│   ├── PlaceholderPage.jsx   # Stub for unimplemented routes; accepts a `title` prop
│   │
│   ├── auth/                 # Role-specific login pages (no AppShell wrapper)
│   │   ├── AdminLogin.jsx
│   │   ├── StudentLogin.jsx
│   │   └── TeacherLogin.jsx
│   │
│   ├── admin/                # Admin-only pages (wrapped in AppShell + ProtectedRoute)
│   │   ├── AdminDashboard.jsx
│   │   ├── StudentManagement.jsx
│   │   ├── AttendanceManagement.jsx
│   │   └── NoticesManagement.jsx
│   │
│   ├── student/
│   │   └── StudentDashboard.jsx
│   │
│   └── teacher/
│       └── TeacherDashboard.jsx
│
└── data/
    └── mockData.js           # All static mock data (students, teachers, attendance, notices, charts)
```

## Key Conventions

- **Route organisation**: Auth pages live outside AppShell. All authenticated pages are children of the AppShell route in `main.jsx`.
- **Adding a new page**: Create the component under the appropriate role folder in `src/pages/`, add a route in `main.jsx` wrapped in `<ProtectedRoute allowedRoles={[...']}>`, and add a menu entry to the relevant role array in `AppShell.jsx`.
- **Placeholder pages**: Use `<PlaceholderPage title="..." />` for routes that are not yet implemented.
- **Data**: Add new mock datasets to `src/data/mockData.js` and import them where needed. No API calls exist anywhere in the codebase.
- **Custom UI components**: Prefer the primitives in `src/components/ui/` for non-MUI elements. Use the `cn()` helper from `src/lib.js` for conditional class merging.
- **Legacy pages**: Root-level files like `src/pages/AdminDashboard.jsx`, `StudentDashboard.jsx`, `TeacherDashboard.jsx` etc. are superseded by the role-subfolder versions. Use the subfolder versions (`admin/`, `student/`, `teacher/`).
- **Context usage**: Always consume via hooks (`useAuth`, `useTheme`). Both throw if used outside their providers.
