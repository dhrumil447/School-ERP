import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { AppShell } from './components/layout/AppShell'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Notices from './pages/Notices'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    element: <AppShell />,
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/students', element: <Students /> },
      { path: '/attendance', element: <Attendance /> },
      { path: '/notices', element: <Notices /> },
      { path: '/student', element: <StudentDashboard /> },
      { path: '/teacher', element: <TeacherDashboard /> },
      { path: '*', element: <Navigate to="/admin" replace /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>)
