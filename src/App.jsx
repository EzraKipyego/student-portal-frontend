import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Grades from './pages/Grades'
import Attendance from './pages/Attendance'
import Timetable from './pages/Timetable'
import Announcements from './pages/Announcements'
import Payments from './pages/Payments'
import Profile from './pages/Profile'

import AdminLayout from './admin/AdminLayout'
import AdminRoute from './admin/AdminRoute'
import AdminDashboard from './admin/pages/AdminDashboard'
import StudentsAdmin from './admin/pages/StudentsAdmin'
import CoursesAdmin from './admin/pages/CoursesAdmin'
import EnrollmentsAdmin from './admin/pages/EnrollmentsAdmin'
import GradesAdmin from './admin/pages/GradesAdmin'
import AttendanceAdmin from './admin/pages/AttendanceAdmin'
import AnnouncementsAdmin from './admin/pages/AnnouncementsAdmin'
import TimetableAdmin from './admin/pages/TimetableAdmin'
import PaymentsAdmin from './admin/pages/PaymentsAdmin'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute>
              <Grades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <AdminLayout>
                <StudentsAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <AdminLayout>
                <CoursesAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/enrollments"
          element={
            <AdminRoute>
              <AdminLayout>
                <EnrollmentsAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/grades"
          element={
            <AdminRoute>
              <AdminLayout>
                <GradesAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <AdminRoute>
              <AdminLayout>
                <AttendanceAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <AdminRoute>
              <AdminLayout>
                <AnnouncementsAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/timetable"
          element={
            <AdminRoute>
              <AdminLayout>
                <TimetableAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <AdminLayout>
                <PaymentsAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
