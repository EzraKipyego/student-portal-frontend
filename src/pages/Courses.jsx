import React, { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

export default function Courses() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    api
      .get('/api/enrollments/')
      .then((res) => { if (!cancelled) setEnrollments(res.results ?? res) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <AppLayout title="Courses">
      <div className="bg-white rounded-2xl shadow-md divide-y divide-slate-100">
        {loading && <p className="px-6 py-8 text-sm text-slate-400">Loading courses…</p>}
        {!loading && error && (
          <p className="px-6 py-8 text-sm text-red-500">Couldn't load courses: {error}</p>
        )}
        {!loading && !error && enrollments.length === 0 && (
          <p className="px-6 py-8 text-sm text-slate-400">No courses yet.</p>
        )}
        {!loading && !error && enrollments.map((e) => (
          <div key={e.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">{e.course.title}</p>
              <p className="text-xs text-slate-500">
                {e.course.code} · {e.course.instructor_name || 'TBA'} · {e.course.credit_hours} credit hours
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600 capitalize">
                {e.status}
              </span>
              <p className="text-xs text-slate-400 mt-1">{e.progress_percent}% complete</p>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
