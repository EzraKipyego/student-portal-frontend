import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  ClipboardList,
  CalendarRange,
  LogOut,
  Megaphone,
  Wallet,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const items = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/students', label: 'Students', icon: GraduationCap },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/enrollments', label: 'Enrollments', icon: Users },
  { to: '/admin/grades', label: 'Grades', icon: ClipboardList },
  { to: '/admin/attendance', label: 'Attendance', icon: ClipboardList },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/timetable', label: 'Timetable', icon: CalendarRange },
  { to: '/admin/payments', label: 'Payments', icon: Wallet },
]

export default function AdminSidebar() {
  const { logout } = useAuth()

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 p-6 text-slate-200 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 font-black text-white">
          S
        </div>
        <div>
          <p className="font-semibold text-white">StudentHub Admin</p>
          <p className="text-sm text-slate-400">Management portal</p>
        </div>
      </div>

      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-200">Secure admin access</p>
        <p className="mt-1">Only authorized administrators can manage school records.</p>
      </div>
      <button
        onClick={logout}
        className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  )
}
