import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <main className="mx-auto max-w-7xl p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
