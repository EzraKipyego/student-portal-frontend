import React, { useEffect, useState } from 'react'
import { BookOpen, GraduationCap, Users, Wallet } from 'lucide-react'
import { api } from '../../lib/api'

const cards = [
  { key: 'students', label: 'Students', icon: GraduationCap, accent: 'from-orange-500 to-amber-400' },
  { key: 'courses', label: 'Courses', icon: BookOpen, accent: 'from-slate-700 to-slate-500' },
  { key: 'enrollments', label: 'Enrollments', icon: Users, accent: 'from-emerald-500 to-teal-400' },
  { key: 'payments', label: 'Payments', icon: Wallet, accent: 'from-violet-500 to-fuchsia-400' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, courses: 0, enrollments: 0, payments: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [users, courses, enrollments, payments] = await Promise.all([
          api.get('/api/auth/users/'),
          api.get('/api/courses/'),
          api.get('/api/enrollments/'),
          api.get('/api/payments/'),
        ])

        setStats({
          students: (users.results || users || []).filter((entry) => entry.role === 'student').length,
          courses: (courses.results || courses || []).length,
          enrollments: (enrollments.results || enrollments || []).length,
          payments: (payments.results || payments || []).length,
        })
      } catch {
        setStats({ students: 0, courses: 0, enrollments: 0, payments: 0 })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, accent }) => {
          const value = loading ? '…' : stats[key]
          return (
            <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white`}>
                <Icon size={18} />
              </div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Quick access</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            { title: 'Students', description: 'Review, add, and edit student accounts.' },
            { title: 'Courses', description: 'Create and maintain course catalog items.' },
            { title: 'Attendance', description: 'Mark and update attendance for each course.' },
            { title: 'Payments', description: 'Track M-Pesa payment status and history.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-medium text-slate-800">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
