import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wallet, BookOpen, ClipboardCheck, CreditCard, ChevronRight } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

const quickActions = [
  { id: 'fees', label: 'School Fees', to: '/payments', icon: Wallet },
  { id: 'courses', label: 'Courses', to: '/courses', icon: BookOpen },
  { id: 'grades', label: 'Reports', to: '/grades', icon: ClipboardCheck },
  { id: 'payments', label: 'Financial Statements', to: '/payments', icon: CreditCard },
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const [enrollmentsRes, announcementsRes] = await Promise.all([
          api.get('/api/enrollments/'),
          api.get('/api/announcements/'),
        ])
        if (cancelled) return
  
        setEnrollments(enrollmentsRes.results ?? enrollmentsRes)
        setAnnouncements(announcementsRes.results ?? announcementsRes)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map(({ id, label, to, icon: Icon }) => (
              <Link
                key={id}
                to={to}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 border border-transparent hover:shadow-lg hover:border-orange-100 transition-all"
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <p className="text-sm font-medium text-slate-700 flex-1">{label}</p>
                <ChevronRight size={16} className="text-slate-300" />
              </Link>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-800">Courses</p>
              <Link to="/courses" className="text-xs font-medium text-orange-600">
                View all
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-md divide-y divide-slate-100">
              {loading && (
                <p className="px-5 py-6 text-sm text-slate-400">Loading courses…</p>
              )}
              {!loading && error && (
                <p className="px-5 py-6 text-sm text-red-500">Couldn't load courses: {error}</p>
              )}
              {!loading && !error && enrollments.length === 0 && (
                <p className="px-5 py-6 text-sm text-slate-400">You're not enrolled in any courses yet.</p>
              )}
              {!loading && !error && enrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{enrollment.course.title}</p>
                    <p className="text-xs text-slate-500">
                      {enrollment.course.code} · {enrollment.course.instructor_name || 'TBA'}
                    </p>
                  </div>
                  <div className="w-32">
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${enrollment.progress_percent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 text-right">{enrollment.progress_percent}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-sm font-semibold text-slate-800 mb-4">Announcements</p>
            <div className="space-y-4">
              {loading && <p className="text-sm text-slate-400">Loading…</p>}
              {!loading && error && (
                <p className="text-sm text-red-500">Couldn't load announcements.</p>
              )}
              {!loading && !error && announcements.length === 0 && (
                <p className="text-sm text-slate-400">No announcements yet.</p>
              )}
              {!loading && !error && announcements.map((a) => (
                <div key={a.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                  <p className="text-sm font-medium text-slate-800">{a.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(a.created_at)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}