import React from 'react'
import ResourceManager from '../components/ResourceManager'

const fields = [
  { name: 'student', label: 'Student', type: 'select', required: true, optionsSource: '/api/auth/users/', optionValueKey: 'id', optionLabel: (item) => `${item.first_name || ''} ${item.last_name || ''}`.trim() || item.email, filterOption: (item) => item.role === 'student' },
  { name: 'amount', label: 'Amount (KES)', type: 'number', required: true },
  { name: 'phone_number', label: 'Phone Number', type: 'text', required: true },
  { name: 'status', label: 'Status', type: 'select', required: true, options: [
    { id: 'pending', label: 'Pending' },
    { id: 'success', label: 'Success' },
    { id: 'failed', label: 'Failed' },
  ], optionValueKey: 'id', optionLabelKey: 'label' },
  { name: 'merchant_request_id', label: 'Merchant Request ID', type: 'text' },
  { name: 'checkout_request_id', label: 'Checkout Request ID', type: 'text' },
  { name: 'mpesa_receipt_number', label: 'M-Pesa Receipt Number', type: 'text' },
]

const columns = [
  { key: 'student_name', label: 'Student' },
  { key: 'amount', label: 'Amount' },
  { key: 'phone_number', label: 'Phone' },
  { key: 'status', label: 'Status' },
  { key: 'mpesa_receipt_number', label: 'Receipt' },
]

export default function PaymentsAdmin() {
  return (
    <ResourceManager
      title="Payments"
      endpoint="/api/payments/"
      columns={columns}
      fields={fields}
      itemLabel="payment"
      emptyMessage="No payments found."
    />
  )
}
