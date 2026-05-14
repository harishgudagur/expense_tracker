import { useEffect, useState } from 'react'

import {
  Receipt,
  TrendingDown,
  Calendar,
} from 'lucide-react'

import DashboardLayout from '../layouts/DashboardLayout'

import ExpenseTable from '../components/table/ExpenseTable'

import API from '../services/api'

function Expenses() {
  const [expenses, setExpenses] =
    useState([])

  const [showForm, setShowForm] =
    useState(false)

  const [title, setTitle] =
    useState('')

  const [amount, setAmount] =
    useState('')

  const [category, setCategory] =
    useState('')

  // FETCH EXPENSES
  const fetchExpenses =
    async () => {
      try {
        const { data } =
          await API.get(
            '/expenses'
          )

        setExpenses(data)
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchExpenses()
  }, [])

  // ADD EXPENSE
  const handleAddExpense =
    async e => {
      e.preventDefault()

      if (
        !title ||
        !amount ||
        !category
      ) {
        alert(
          'Please fill all fields'
        )
        return
      }

      try {
        await API.post(
          '/expenses',
          {
            title,
            amount: Number(amount),
            category,
          }
        )

        // RESET FORM
        setTitle('')
        setAmount('')
        setCategory('')

        // CLOSE FORM
        setShowForm(false)

        // REFRESH
        fetchExpenses()
      } catch (error) {
        console.log(error)
      }
    }

  // TOTAL
  const totalExpenses =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  // HIGHEST
  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            item => item.amount
          )
        )
      : 0

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">

        <div>

          <h1 className="text-4xl md:text-7xl font-black">
            Expenses
          </h1>

          <p className="text-slate-400 mt-4 text-xl">
            Manage and track all your expenses
          </p>

        </div>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition"
        >
          {showForm
            ? 'Close'
            : '+ Add Expense'}
        </button>

      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="mb-10 p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl">

          <h2 className="text-3xl font-black mb-8">
            Add Expense
          </h2>

          <form
            onSubmit={
              handleAddExpense
            }
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >

            <input
              type="text"
              placeholder="Expense Title"
              value={title}
              onChange={e =>
                setTitle(
                  e.target.value
                )
              }
              className="bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e =>
                setAmount(
                  e.target.value
                )
              }
              className="bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={e =>
                setCategory(
                  e.target.value
                )
              }
              className="bg-slate-800 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-bold hover:scale-105 transition"
            >
              Add Expense
            </button>

          </form>

        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

        {/* TOTAL */}
        <div className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-lg">
                Total Expenses
              </p>

              <h1 className="text-3xl md:text-6xl font-black text-cyan-400 mt-5">
                ₹ {totalExpenses}
              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

              <Receipt
                size={32}
                className="text-cyan-400"
              />

            </div>

          </div>

        </div>

        {/* HIGHEST */}
        <div className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-lg">
                Highest Expense
              </p>

              <h1 className="text-3xl md:text-6xl font-black text-red-400 mt-5">
                ₹ {highestExpense}
              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">

              <TrendingDown
                size={32}
                className="text-red-400"
              />

            </div>

          </div>

        </div>

        {/* MONTH */}
        <div className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-lg">
                This Month
              </p>

              <h1 className="text-3xl md:text-6xl font-black text-purple-400 mt-5">
                ₹ {totalExpenses}
              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

              <Calendar
                size={32}
                className="text-purple-400"
              />

            </div>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <ExpenseTable
        expenses={expenses}
        income={[]}
        fetchExpenses={
          fetchExpenses
        }
      />

    </DashboardLayout>
  )
}

export default Expenses