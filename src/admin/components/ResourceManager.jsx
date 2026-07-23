import React, { useEffect, useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { api } from '../../lib/api'

function getInitialFormValues(fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const defaultValue = field.defaultValue ?? ''
      return [field.name, defaultValue]
    })
  )
}

function toDisplayValue(item, column) {
  if (typeof column.render === 'function') return column.render(item)
  if (column.key) {
    const value = item[column.key]
    if (value === null || value === undefined || value === '') return '—'
    return value
  }
  return '—'
}

function normalizeListPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  return []
}

function toApiPath(url) {
  const parsed = new URL(url, window.location.origin)
  return `${parsed.pathname}${parsed.search}`
}

export default function ResourceManager({
  title,
  endpoint,
  createEndpoint = endpoint,
  columns = [],
  fields = [],
  itemLabel = 'record',
  emptyMessage = 'No records found.',
  allowCreate = true,
  allowEdit = true,
  allowDelete = true,
  recordFilter,
}) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState(getInitialFormValues(fields))
  const [submitting, setSubmitting] = useState(false)
  const [selectOptions, setSelectOptions] = useState({})

  const loadAllPages = async (path) => {
    const items = []
    let nextPath = path

    while (nextPath) {
      const data = await api.get(nextPath)
      items.push(...normalizeListPayload(data))
      nextPath = data?.next ? toApiPath(data.next) : null
    }

    return items
  }

  const loadRecords = async () => {
    try {
      setLoading(true)
      setError('')
      setRecords(await loadAllPages(endpoint))
    } catch (err) {
      setError(err.message || 'Unable to load records')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords()
  }, [endpoint])

  useEffect(() => {
    const sources = fields.filter((field) => field.optionsSource).map((field) => field.optionsSource)
    const uniqueSources = [...new Set(sources)]

    uniqueSources.forEach(async (source) => {
      try {
        const options = await loadAllPages(source)
        setSelectOptions((prev) => ({ ...prev, [source]: options }))
      } catch {
        setSelectOptions((prev) => ({ ...prev, [source]: [] }))
      }
    })
  }, [fields])

  const filteredRecords = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const visibleRecords = recordFilter ? records.filter(recordFilter) : records
    if (!term) return visibleRecords

    return visibleRecords.filter((item) => {
      const haystack = columns
        .map((column) => toDisplayValue(item, column))
        .join(' ')
        .toLowerCase()
      return haystack.includes(term)
    })
  }, [columns, recordFilter, records, searchTerm])

  const openCreate = () => {
    setEditingItem(null)
    setFormData(getInitialFormValues(fields))
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    const nextState = {}
    fields.forEach((field) => {
      const value = typeof field.valueFrom === 'function' ? field.valueFrom(item) : item[field.name]
      nextState[field.name] = value ?? ''
    })
    setFormData(nextState)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingItem(null)
    setFormData(getInitialFormValues(fields))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const payload = {}
    fields.forEach((field) => {
      if (field.createOnly && editingItem) return
      let value = formData[field.name]
      if (field.type === 'number' && value !== '') {
        value = Number(value)
      }
      if (field.type === 'checkbox') {
        value = Boolean(value)
      }
      if (field.type === 'date' && value === '') {
        value = null
      }
      if (field.type === 'select' && value === '') {
        value = null
      }
      if (!(editingItem && field.omitWhenEmpty && value === '')) {
        payload[field.name] = value
      }
    })

    try {
      const url = editingItem ? `${endpoint}${editingItem.id}/` : createEndpoint
      if (editingItem) {
        await api.patch(url, payload)
      } else {
        await api.post(url, payload)
      }
      closeModal()
      await loadRecords()
    } catch (err) {
      setError(err.message || 'Unable to save record')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete this ${itemLabel}?`)) return
    try {
      await api.del(`${endpoint}${item.id}/`)
      await loadRecords()
    } catch (err) {
      setError(err.message || 'Unable to delete record')
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">Manage {itemLabel}s across the school portal.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500">
            <Search size={16} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="w-full border-0 bg-transparent outline-none"
            />
          </label>
          {allowCreate && (
            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              <Plus size={16} />
              Add {itemLabel}
            </button>
          )}
        </div>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Loading {itemLabel}s…
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-600">
                {columns.map((column) => (
                  <th key={column.key || column.label} className="px-4 py-3 font-medium">
                    {column.label}
                  </th>
                ))}
                {(allowEdit || allowDelete) && <th className="px-4 py-3 font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column.key || column.label} className="px-4 py-3 text-slate-700">
                      {toDisplayValue(item, column)}
                    </td>
                  ))}
                  {(allowEdit || allowDelete) && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {allowEdit && (
                          <button
                            onClick={() => openEdit(item)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
                            aria-label={`Edit ${itemLabel}`}
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        {allowDelete && (
                          <button
                            onClick={() => handleDelete(item)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:text-red-600"
                            aria-label={`Delete ${itemLabel}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingItem ? `Edit ${itemLabel}` : `Create ${itemLabel}`}
                </h3>
                <p className="text-sm text-slate-500">Fill in the details below.</p>
              </div>
              <button onClick={closeModal} className="text-sm text-slate-500 hover:text-slate-700">
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {fields.filter((field) => !(field.createOnly && editingItem)).map((field) => {
                  const commonClassName =
                    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100'

                  if (field.type === 'textarea') {
                    return (
                      <div key={field.name} className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-700">{field.label}</label>
                        <textarea
                          required={field.required && !(field.createOnly && editingItem)}
                          value={formData[field.name] ?? ''}
                          onChange={(event) =>
                            setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))
                          }
                          className={commonClassName}
                          rows={4}
                        />
                      </div>
                    )
                  }

                  if (field.type === 'select') {
                    const options = field.optionsSource
                      ? (selectOptions[field.optionsSource] || []).filter((item) =>
                          typeof field.filterOption === 'function' ? field.filterOption(item) : true
                        )
                      : field.options || []

                    return (
                      <div key={field.name}>
                        <label className="mb-1 block text-sm font-medium text-slate-700">{field.label}</label>
                        <select
                          required={field.required && !(field.createOnly && editingItem)}
                          value={formData[field.name] ?? ''}
                          onChange={(event) =>
                            setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))
                          }
                          className={commonClassName}
                        >
                          <option value="">Select {field.label}</option>
                          {options.map((option) => {
                            const value = option[field.optionValueKey || 'id']
                            const label =
                              typeof field.optionLabel === 'function'
                                ? field.optionLabel(option)
                                : option[field.optionLabelKey || 'name'] || option[field.optionLabelKey || 'title'] || option.email || option.id
                            return (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    )
                  }

                  if (field.type === 'checkbox') {
                    return (
                      <div key={field.name} className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <input
                            type="checkbox"
                            checked={Boolean(formData[field.name])}
                            onChange={(event) =>
                              setFormData((prev) => ({ ...prev, [field.name]: event.target.checked }))
                            }
                          />
                          {field.label}
                        </label>
                      </div>
                    )
                  }

                  return (
                    <div key={field.name}>
                      <label className="mb-1 block text-sm font-medium text-slate-700">{field.label}</label>
                      <input
                        type={field.type || 'text'}
                        required={field.required && !(field.createOnly && editingItem)}
                        value={formData[field.name] ?? ''}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))
                        }
                        className={commonClassName}
                      />
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-70"
                >
                  {submitting ? 'Saving…' : editingItem ? 'Save changes' : 'Create record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
