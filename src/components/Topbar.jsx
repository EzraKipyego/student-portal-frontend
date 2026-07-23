import React from 'react'
import { Bell, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function getInitials(user) {
  if (!user) return ''
  const first = user.first_name?.[0] || ''
  const last = user.last_name?.[0] || ''
  if (first || last) return `${first}${last}`.toUpperCase()
  return user.email?.[0]?.toUpperCase() || 'U'
}

export default function Topbar({ title }) {
  const { user } = useAuth()
  const initials = getInitials(user)

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100">
          <Settings size={18} />
        </button>
        <button className="h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <div className="h-9 w-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      </div>
    </header>
  )
}