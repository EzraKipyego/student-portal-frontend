import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'body', label: 'Body', type: 'textarea', required: true },
  { name: 'is_pinned', label: 'Pin announcement', type: 'checkbox' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'created_by_name', label: 'Created By' },
  { key: 'is_pinned', label: 'Pinned' },
]

export default function AnnouncementsAdmin() {
  return (
    <ResourceManager
      title="Announcements"
      endpoint="/api/announcements/"
      columns={columns}
      fields={fields}
      itemLabel="announcement"
      emptyMessage="No announcements found."
    />
  )
}
