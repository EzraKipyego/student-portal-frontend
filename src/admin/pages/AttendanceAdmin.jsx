import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'student', label: 'Student', type: 'select', required: true, optionsSource: '/api/auth/users/', optionValueKey: 'id', optionLabel: (item) => `${item.first_name || ''} ${item.last_name || ''}`.trim() || item.email, filterOption: (item) => item.role === 'student' },
  { name: 'course', label: 'Course', type: 'select', required: true, optionsSource: '/api/courses/', optionValueKey: 'id', optionLabelKey: 'title' },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: [
    { id: 'present', label: 'Present' },
    { id: 'absent', label: 'Absent' },
    { id: 'late', label: 'Late' },
    { id: 'excused', label: 'Excused' },
  ], optionValueKey: 'id', optionLabelKey: 'label' },
]

const columns = [
  { key: 'student_name', label: 'Student' },
  { key: 'course_title', label: 'Course' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

export default function AttendanceAdmin() {
  return (
    <ResourceManager
      title="Attendance"
      endpoint="/api/attendance/"
      columns={columns}
      fields={fields}
      itemLabel="attendance record"
      emptyMessage="No attendance records found."
    />
  )
}
