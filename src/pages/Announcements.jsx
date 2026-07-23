import React, { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    api
      .get('/api/announcements/')
      .then((res) => { if (!cancelled) setAnnouncements(res.results ?? res) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <AppLayout title="Announcements">
      <div className="bg-white rounded-2xl shadow-md divide-y divide-slate-100">
        {loading && <p className="px-6 py-8 text-sm text-slate-400">Loading announcements…</p>}
        {!loading && error && (
          <p className="px-6 py-8 text-sm text-red-500">Couldn't load announcements: {error}</p>
        )}
        {!loading && !error && announcements.length === 0 && (
          <p className="px-6 py-8 text-sm text-slate-400">No announcements yet.</p>
        )}
        {!loading && !error && announcements.map((a) => (
          <div key={a.id} className="px-6 py-4">
            <div className="flex items-center gap-2">
              {a.is_pinned && (
                <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  Pinned
                </span>
              )}
              <p className="text-sm font-semibold text-slate-800">{a.title}</p>
            </div>
            <p className="text-sm text-slate-600 mt-1">{a.body}</p>
            <p className="text-xs text-slate-400 mt-2">
              {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
