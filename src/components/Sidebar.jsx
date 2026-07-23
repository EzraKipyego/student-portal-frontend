import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  CalendarDays,
  Megaphone,
  Wallet,
  UserRound,
  LogOut,
  Shield,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/grades', label: 'Gradebook', icon: ClipboardCheck },
  { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/timetable', label: 'Timetable', icon: CalendarDays },
  { to: '/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/payments', label: 'Payments', icon: Wallet },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export default function Sidebar() {
  const { logout, user } = useAuth()
  const navigationItems = user?.role === 'admin'
    ? [...navItems, { to: '/admin', label: 'Admin', icon: Shield }]
    : navItems

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 bg-slate-900 text-slate-200 min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="h-9 w-9 rounded-lg bg-orange-500 flex items-center justify-center font-extrabold text-white">
          S
        </div>
        <div>
          <p className="text-white font-bold leading-tight">I-Campus</p>
          <p className="text-[11px] text-slate-400 -mt-0.5">Student Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navigationItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut size={18} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  )
}
