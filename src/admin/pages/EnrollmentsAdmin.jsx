import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'student_id', label: 'Student', type: 'select', required: true, optionsSource: '/api/auth/users/', optionValueKey: 'id', optionLabel: (item) => `${item.first_name || ''} ${item.last_name || ''}`.trim() || item.email, filterOption: (item) => item.role === 'student', valueFrom: (item) => item.student?.id },
  { name: 'course_id', label: 'Course', type: 'select', required: true, optionsSource: '/api/courses/', optionValueKey: 'id', optionLabelKey: 'title', valueFrom: (item) => item.course?.id },
  { name: 'status', label: 'Status', type: 'select', required: true, options: [
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'dropped', label: 'Dropped' },
  ], optionValueKey: 'id', optionLabelKey: 'label' },
  { name: 'progress_percent', label: 'Progress (%)', type: 'number' },
]

const columns = [
  { key: 'student', label: 'Student', render: (item) => item.student?.first_name ? `${item.student.first_name} ${item.student.last_name}` : item.student?.email || '—' },
  { key: 'course', label: 'Course', render: (item) => item.course?.title || '—' },
  { key: 'status', label: 'Status' },
  { key: 'progress_percent', label: 'Progress' },
]

export default function EnrollmentsAdmin() {
  return (
    <ResourceManager
      title="Enrollments"
      endpoint="/api/enrollments/"
      columns={columns}
      fields={fields}
      itemLabel="enrollment"
      emptyMessage="No enrollments found."
    />
  )
}
