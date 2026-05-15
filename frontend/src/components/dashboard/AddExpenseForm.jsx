import { useState } from 'react'
import toast from 'react-hot-toast'

import API from '../../services/api'

function AddExpenseForm({ fetchExpenses }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await API.post('/expenses', formData)

      toast.success('Expense added')

      setFormData({
        title: '',
        amount: '',
        category: '',
      })

      fetchExpenses()
    } catch (_error) {
      toast.error('Failed to add expense')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 p-6 rounded-3xl bg-[#111827]/90 border border-white/10 shadow-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">
        Add Expense
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          className="px-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="px-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="px-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

      </div>

      <button className="mt-6 px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold">
        Add Expense
      </button>
    </form>
  )
}

export default AddExpenseForm