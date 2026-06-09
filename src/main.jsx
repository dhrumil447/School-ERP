import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { AppShell } from './components/layout/AppShell'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Auth Pages
import AdminLogin from './pages/auth/AdminLogin'
import StudentLogin from './pages/auth/StudentLogin'
import TeacherLogin from './pages/auth/TeacherLogin'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import StudentManagement from './pages/admin/StudentManagement'
import TeacherManagement from './pages/admin/TeacherManagement'
import AttendanceManagement from './pages/admin/AttendanceManagement'
import NoticesManagement from './pages/admin/NoticesManagement'
import FeeManagement from './pages/admin/FeeManagement'
import ResultManagement from './pages/admin/ResultManagement'
import TimetableManagement from './pages/admin/TimetableManagement'
import LibraryManagement from './pages/admin/LibraryManagement'
import TransportManagement from './pages/admin/TransportManagement'
import EventsManagement from './pages/admin/EventsManagement'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import SettingsPage from './pages/admin/SettingsPage'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentResults from './pages/student/StudentResults'
import StudentAttendance from './pages/student/StudentAttendance'
import StudentFees from './pages/student/StudentFees'
import StudentTimetable from './pages/student/StudentTimetable'
import StudentNotices from './pages/student/StudentNotices'

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherAttendance from './pages/teacher/TeacherAttendance'
import TeacherResults from './pages/teacher/TeacherResults'
import TeacherStudents from './pages/teacher/TeacherStudents'
import TeacherTimetable from './pages/teacher/TeacherTimetable'

// Landing Page
import Landing from './pages/Landing'

const PA = (roles, Component) => (
  <ProtectedRoute allowedRoles={roles}><Component /></ProtectedRoute>
)

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },

  // Auth Routes
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/student/login', element: <StudentLogin /> },
  { path: '/teacher/login', element: <TeacherLogin /> },

  // Protected Routes — All under AppShell layout
  {
    element: <AppShell />,
    children: [
      // ── Admin Routes ──────────────────────────────────────────────────────
      { path: '/admin/dashboard', element: PA(['admin'], AdminDashboard) },
      { path: '/admin/students', element: PA(['admin'], StudentManagement) },
      { path: '/admin/teachers', element: PA(['admin'], TeacherManagement) },
      { path: '/admin/attendance', element: PA(['admin'], AttendanceManagement) },
      { path: '/admin/fees', element: PA(['admin'], FeeManagement) },
      { path: '/admin/results', element: PA(['admin'], ResultManagement) },
      { path: '/admin/timetable', element: PA(['admin'], TimetableManagement) },
      { path: '/admin/notices', element: PA(['admin'], NoticesManagement) },
      { path: '/admin/events', element: PA(['admin'], EventsManagement) },
      { path: '/admin/library', element: PA(['admin'], LibraryManagement) },
      { path: '/admin/transport', element: PA(['admin'], TransportManagement) },
      { path: '/admin/analytics', element: PA(['admin'], AnalyticsPage) },
      { path: '/admin/settings', element: PA(['admin'], SettingsPage) },

      // ── Student Routes ─────────────────────────────────────────────────────
      { path: '/student/dashboard', element: PA(['student'], StudentDashboard) },
      { path: '/student/results', element: PA(['student'], StudentResults) },
      { path: '/student/attendance', element: PA(['student'], StudentAttendance) },
      { path: '/student/fees', element: PA(['student'], StudentFees) },
      { path: '/student/timetable', element: PA(['student'], StudentTimetable) },
      { path: '/student/notices', element: PA(['student'], StudentNotices) },

      // ── Teacher Routes ─────────────────────────────────────────────────────
      { path: '/teacher/dashboard', element: PA(['teacher'], TeacherDashboard) },
      { path: '/teacher/attendance', element: PA(['teacher'], TeacherAttendance) },
      { path: '/teacher/results', element: PA(['teacher'], TeacherResults) },
      { path: '/teacher/students', element: PA(['teacher'], TeacherStudents) },
      { path: '/teacher/timetable', element: PA(['teacher'], TeacherTimetable) },

      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
