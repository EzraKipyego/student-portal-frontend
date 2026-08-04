import React, { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import { api } from '../lib/api'

const statusStyles = {
  success: 'bg-green-50 text-green-600',
  pending: 'bg-amber-50 text-amber-600',
  failed: 'bg-red-50 text-red-600',
}

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formNotice, setFormNotice] = useState('')

  async function loadPayments() {
    try {
      const res = await api.get('/api/payments/')
      const list = res.results ?? res
      setPayments(list)
      return list
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPayments()
  }, [])

  async function handlePay(e) {
    e.preventDefault()
    setFormError('')
    setFormNotice('')
    setSubmitting(true)
    try {
      const payment = await api.post('/api/payments/initiate/', {
        amount: Number(amount),
        phone_number: phone,
      })

      setFormNotice(`STK Push initiated. Complete the payment on ${phone}.`)
      setAmount('')
      setPhone('')
      await loadPayments()

     
      let attempts = 0
      const poll = setInterval(async () => {
        attempts += 1
        const updatedPayments = await loadPayments()
        const currentPayment = updatedPayments.find((p) => p.id === payment.id)

        if (currentPayment?.status === 'success') {
          setFormNotice(`Payment successful. Receipt: ${currentPayment.mpesa_receipt_number}`)
          clearInterval(poll)
        } else if (currentPayment?.status === 'failed') {
          setFormNotice('')
          setFormError('Payment failed. Please try again.')
          clearInterval(poll)
        } else if (attempts >= 10) {
          clearInterval(poll) 
        }
      }, 3000)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppLayout title="Financial Statements">
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-md">
          <p className="text-sm font-semibold text-slate-800 mb-1">Pay School Fees</p>
          <p className="text-xs text-slate-500 mb-4">Use your Daraja sandbox test phone number.</p>
          <form onSubmit={handlePay} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Amount (KES)</label>
              <input
                type="number"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">M-Pesa Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                placeholder="2547XXXXXXXX"
              />
            </div>

            {formError && <p className="text-sm text-red-600">{formError}</p>}
            {formNotice && <p className="text-sm text-green-600">{formNotice}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg py-2.5 text-sm transition-colors disabled:opacity-60"
            >
              {submitting ? 'Sending STK Push…' : 'Pay with M-Pesa'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-md divide-y divide-slate-100">
          {loading && <p className="px-6 py-8 text-sm text-slate-400">Loading payments…</p>}
          {!loading && error && (
            <p className="px-6 py-8 text-sm text-red-500">Couldn't load payments: {error}</p>
          )}
          {!loading && !error && payments.length === 0 && (
            <p className="px-6 py-8 text-sm text-slate-400">No payment records yet.</p>
          )}
          {!loading && !error && payments.map((p) => (
            <div key={p.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">KES {p.amount}</p>
                <p className="text-xs text-slate-500">
                  {p.phone_number} · {new Date(p.created_at).toLocaleString()}
                  {p.mpesa_receipt_number ? ` · Receipt: ${p.mpesa_receipt_number}` : ''}
                </p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusStyles[p.status] || 'bg-slate-100 text-slate-500'}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}