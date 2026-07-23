import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Temporary Password', type: 'password', required: true, createOnly: true, omitWhenEmpty: true },
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
  { name: 'admission_number', label: 'Admission Number', type: 'text' },
  { name: 'phone_number', label: 'Phone Number', type: 'text' },
  { name: 'program', label: 'Program', type: 'text' },
]

const columns = [
  { key: 'email', label: 'Email' },
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'admission_number', label: 'Admission Number' },
  { key: 'program', label: 'Program' },
  { key: 'role', label: 'Role' },
]

export default function StudentsAdmin() {
  return (
    <ResourceManager
      title="Students"
      endpoint="/api/auth/users/"
      columns={columns}
      fields={fields}
      itemLabel="student"
      emptyMessage="No students found."
      recordFilter={(user) => user.role === 'student'}
    />
  )
}
