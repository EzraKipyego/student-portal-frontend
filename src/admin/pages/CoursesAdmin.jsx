import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'code', label: 'Course Code', type: 'text', required: true },
  { name: 'title', label: 'Course Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'instructor_name', label: 'Instructor', type: 'text' },
  { name: 'credit_hours', label: 'Credit Hours', type: 'number' },
]

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Title' },
  { key: 'instructor_name', label: 'Instructor' },
  { key: 'credit_hours', label: 'Credits' },
]

export default function CoursesAdmin() {
  return (
    <ResourceManager
      title="Courses"
      endpoint="/api/courses/"
      columns={columns}
      fields={fields}
      itemLabel="course"
      emptyMessage="No courses found."
    />
  )
}
