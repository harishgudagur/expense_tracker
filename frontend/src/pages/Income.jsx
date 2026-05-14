import {
  useEffect,
  useState,
} from 'react'

import toast from 'react-hot-toast'

import DashboardLayout from '../layouts/DashboardLayout'

import API from '../services/api'

function Income() {
  const [income, setIncome] =
    useState([])

  const [formData, setFormData] =
    useState({
      source: '',
      amount: '',
    })

  // FETCH INCOME
  const fetchIncome =
    async () => {
      try {
        const { data } =
          await API.get('/income')

        setIncome(data)
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchIncome()
  }, [])

  // HANDLE CHANGE
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  // ADD INCOME
  const handleSubmit =
    async e => {
      e.preventDefault()

      try {
        await API.post(
          '/income',
          formData
        )

        toast.success(
          'Income added successfully'
        )

        setFormData({
          source: '',
          amount: '',
        })

        fetchIncome()
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            'Failed to add income'
        )
      }
    }

  // TOTAL
  const totalIncome =
    income.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-6xl font-black">

          Income

        </h1>

        <p className="text-slate-400 mt-3">

          Track all your income sources

        </p>

      </div>

      {/* TOTAL CARD */}
      <div className="p-8 rounded-[30px] bg-[#111827]/70 border border-white/10 mb-10">

        <p className="text-slate-400">

          Total Income

        </p>

        <h1 className="text-6xl font-black text-cyan-400 mt-4">

          ₹ {totalIncome}

        </h1>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
      >

        <input
          type="text"
          name="source"
          placeholder="Income Source"
          value={formData.source}
          onChange={handleChange}
          className="px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-bold hover:scale-105 transition-all">

          Add Income

        </button>

      </form>

      {/* INCOME LIST */}
      <div className="space-y-4">

        {income.map(item => (
          <div
            key={item._id}
            className="p-6 rounded-2xl bg-[#111827]/70 border border-white/10 flex items-center justify-between"
          >

            <div>

              <h2 className="text-2xl font-bold">

                {item.source}

              </h2>

              <p className="text-slate-400 mt-1">

                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

            <h1 className="text-3xl font-black text-cyan-400">

              ₹ {item.amount}

            </h1>

          </div>
        ))}

      </div>

    </DashboardLayout>
  )
}

export default Income