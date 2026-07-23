import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'enrollment', label: 'Enrollment', type: 'select', required: true, optionsSource: '/api/enrollments/', optionValueKey: 'id', optionLabel: (item) => `${item.student_name || item.student?.email || item.student || 'Unknown'} — ${item.course_title || item.course?.title || 'Course'}` },
  { name: 'term', label: 'Term', type: 'text', required: true },
  { name: 'score', label: 'Score', type: 'number', required: true },
  { name: 'letter_grade', label: 'Letter Grade', type: 'text' },
  { name: 'remarks', label: 'Remarks', type: 'text' },
]

const columns = [
  { key: 'student_name', label: 'Student' },
  { key: 'course_title', label: 'Course' },
  { key: 'term', label: 'Term' },
  { key: 'score', label: 'Score' },
  { key: 'letter_grade', label: 'Grade' },
]

export default function GradesAdmin() {
  return (
    <ResourceManager
      title="Grades"
      endpoint="/api/grades/"
      columns={columns}
      fields={fields}
      itemLabel="grade"
      emptyMessage="No grades found."
    />
  )
}
