import React, { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

export default function Grades() {
  const [grades, setGrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    api
      .get('/api/grades/')
      .then((res) => { if (!cancelled) setGrades(res.results ?? res) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <AppLayout title="Reports">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading && <p className="px-6 py-8 text-sm text-slate-400">Loading grades…</p>}
        {!loading && error && (
          <p className="px-6 py-8 text-sm text-red-500">Couldn't load grades: {error}</p>
        )}
        {!loading && !error && grades.length === 0 && (
          <p className="px-6 py-8 text-sm text-slate-400">No grades recorded yet.</p>
        )}
        {!loading && !error && grades.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium">Term</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium">Grade</th>
                <th className="px-6 py-3 font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grades.map((g) => (
                <tr key={g.id}>
                  <td className="px-6 py-3 font-medium text-slate-800">
                    {g.course_title ? `${g.course_title} (${g.course_code})` : `Enrollment #${g.enrollment}`}
                  </td>
                  <td className="px-6 py-3 text-slate-500">{g.term}</td>
                  <td className="px-6 py-3 text-slate-500">{g.score}</td>
                  <td className="px-6 py-3 text-slate-500">{g.letter_grade || '—'}</td>
                  <td className="px-6 py-3 text-slate-500">{g.remarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  )
}
