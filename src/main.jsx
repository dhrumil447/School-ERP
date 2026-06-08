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
import AttendanceManagement from './pages/admin/AttendanceManagement'
import NoticesManagement from './pages/admin/NoticesManagement'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard'

// Placeholder pages
import PlaceholderPage from './pages/PlaceholderPage'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/admin/login" replace /> },
  
  // Auth Routes
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/student/login', element: <StudentLogin /> },
  { path: '/teacher/login', element: <TeacherLogin /> },

  // Protected Routes
  {
    element: <AppShell />,
    children: [
      // Admin Routes
      {
        path: '/admin/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/students',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <StudentManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/attendance',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AttendanceManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/notices',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <NoticesManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/fees',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlaceholderPage title="Fee Management" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/results',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlaceholderPage title="Results Management" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/timetable',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlaceholderPage title="Timetable Management" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/library',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlaceholderPage title="Library Management" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/transport',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlaceholderPage title="Transport Management" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/parent',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlaceholderPage title="Parent Portal" />
          </ProtectedRoute>
        ),
      },

      // Student Routes
      {
        path: '/student/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/student/attendance',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <PlaceholderPage title="My Attendance" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/student/notices',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <PlaceholderPage title="Notices" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/student/results',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <PlaceholderPage title="My Results" />
          </ProtectedRoute>
        ),
      },

      // Teacher Routes
      {
        path: '/teacher/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/teacher/attendance',
        element: (
          <ProtectedRoute allowedRoles={['teacher']}>
            <PlaceholderPage title="Mark Attendance" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/teacher/classes',
        element: (
          <ProtectedRoute allowedRoles={['teacher']}>
            <PlaceholderPage title="My Classes" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/teacher/notices',
        element: (
          <ProtectedRoute allowedRoles={['teacher']}>
            <PlaceholderPage title="Notices" />
          </ProtectedRoute>
        ),
      },

      { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
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
