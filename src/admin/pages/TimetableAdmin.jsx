import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'course', label: 'Course', type: 'select', required: true, optionsSource: '/api/courses/', optionValueKey: 'id', optionLabelKey: 'title' },

  { 
    name: 'day_of_week', 
    label: 'Day', 
    type: 'select', 
    required: true, 
    options: [
      { id: 'mon', label: 'Monday' },
      { id: 'tue', label: 'Tuesday' },
      { id: 'wed', label: 'Wednesday' },
      { id: 'thu', label: 'Thursday' },
      { id: 'fri', label: 'Friday' },
      { id: 'sat', label: 'Saturday' },
    ], 
    optionValueKey: 'id', 
    optionLabelKey: 'label' 
  },

  { name: 'start_time', label: 'Start Time', type: 'time', required: true },
  { name: 'end_time', label: 'End Time', type: 'time', required: true },

  { name: 'venue', label: 'Venue', type: 'text' },
]

const columns = [
  { key: 'course_title', label: 'Course' },
  { key: 'day_of_week', label: 'Day' },
  { key: 'start_time', label: 'Start' },
  { key: 'end_time', label: 'End' },
  { key: 'venue', label: 'Venue' },
]

export default function TimetableAdmin() {
  return (
    <ResourceManager
      title="Timetable"
      endpoint="/api/timetable/"
      columns={columns}
      fields={fields}
      itemLabel="timetable slot"
      emptyMessage="No timetable entries found."
    />
  )
}