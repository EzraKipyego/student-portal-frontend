import React, { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

const statusStyles = {
  present: 'bg-green-50 text-green-600',
  absent: 'bg-red-50 text-red-600',
  late: 'bg-amber-50 text-amber-600',
  excused: 'bg-slate-100 text-slate-500',
}

export default function Attendance() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    api
      .get('/api/attendance/')
      .then((res) => { if (!cancelled) setRecords(res.results ?? res) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <AppLayout title="Attendance">
      <div className="bg-white rounded-2xl shadow-md divide-y divide-slate-100">
        {loading && <p className="px-6 py-8 text-sm text-slate-400">Loading attendance…</p>}
        {!loading && error && (
          <p className="px-6 py-8 text-sm text-red-500">Couldn't load attendance: {error}</p>
        )}
        {!loading && !error && records.length === 0 && (
          <p className="px-6 py-8 text-sm text-slate-400">No attendance records yet.</p>
        )}
        {!loading && !error && records.map((r) => (
          <div key={r.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">{r.course_title}</p>
              <p className="text-xs text-slate-500">{r.date}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusStyles[r.status] || 'bg-slate-100 text-slate-500'}`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
