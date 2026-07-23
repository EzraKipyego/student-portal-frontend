import React, { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

const dayLabels = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday',
  thu: 'Thursday', fri: 'Friday', sat: 'Saturday',
}

export default function Timetable() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    api
      .get('/api/timetable/')
      .then((res) => { if (!cancelled) setEntries(res.results ?? res) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <AppLayout title="Timetable">
      <div className="bg-white rounded-2xl shadow-md divide-y divide-slate-100">
        {loading && <p className="px-6 py-8 text-sm text-slate-400">Loading timetable…</p>}
        {!loading && error && (
          <p className="px-6 py-8 text-sm text-red-500">Couldn't load timetable: {error}</p>
        )}
        {!loading && !error && entries.length === 0 && (
          <p className="px-6 py-8 text-sm text-slate-400">No timetable entries yet.</p>
        )}
        {!loading && !error && entries.map((t) => (
          <div key={t.id} className="px-6 py-4">
            <p className="text-sm font-semibold text-slate-800">
              {t.course_title} <span className="text-slate-400 font-normal">({t.course_code})</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {dayLabels[t.day_of_week] || t.day_of_week} · {t.start_time} – {t.end_time}
              {t.venue ? ` · ${t.venue}` : ''}
            </p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
