import React from 'react'
import AppLayout from '../components/AppLayout'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim()
  const fields = [
    { label: 'Full name', value: fullName || '—' },
    { label: 'Email', value: user.email },
    { label: 'Role', value: user.role },
    { label: 'Admission number', value: user.admission_number || '—' },
    { label: 'Phone number', value: user.phone_number || '—' },
    { label: 'Program', value: user.program || '—' },
  ]

  return (
    <AppLayout title="Profile">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-semibold">
            {(user.first_name?.[0] || user.email[0]).toUpperCase()}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800">{fullName || user.email}</p>
            <p className="text-sm text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>
        <dl className="space-y-3">
          {fields.map((f) => (
            <div key={f.label} className="flex justify-between text-sm border-b border-slate-100 pb-2 last:border-0">
              <dt className="text-slate-500">{f.label}</dt>
              <dd className="text-slate-800 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </AppLayout>
  )
}
