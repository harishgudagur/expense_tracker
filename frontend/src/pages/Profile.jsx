import {
  useEffect,
  useState,
} from 'react'

import DashboardLayout from '../layouts/DashboardLayout'

import API from '../services/api'

function Profile() {
  const storedUser = JSON.parse(
    localStorage.getItem('user')
  )

  const [expenses, setExpenses] =
    useState([])

  const [income, setIncome] =
    useState([])

  const [editing, setEditing] =
    useState(false)

  const [name, setName] =
    useState(
      storedUser?.name || 'User'
    )

  const [email, setEmail] =
    useState(
      storedUser?.email ||
        'No Email'
    )

  // FETCH DATA
  useEffect(() => {
    fetchExpenses()
    fetchIncome()
  }, [])

  const fetchExpenses =
    async () => {
      try {
        const { data } =
          await API.get(
            '/expenses'
          )

        setExpenses(data || [])
      } catch (error) {
        console.log(error)
      }
    }

  const fetchIncome =
    async () => {
      try {
        const { data } =
          await API.get(
            '/income'
          )

        setIncome(data || [])
      } catch (error) {
        console.log(error)
      }
    }

  // TOTALS
  const totalExpenses =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  const totalIncome =
    income.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  const savings =
    totalIncome -
    totalExpenses

  // SAVE PROFILE
  const handleSave = () => {
    const updatedUser = {
      ...storedUser,
      name,
      email,
    }

    localStorage.setItem(
      'user',
      JSON.stringify(
        updatedUser
      )
    )

    setEditing(false)
  }

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl md:text-7xl font-black">

          Profile

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Manage your account
          information

        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="p-10 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl text-center">

          {/* AVATAR */}
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-3xl md:text-6xl font-black mx-auto text-black shadow-[0_0_40px_rgba(6,182,212,0.4)]">

            {name.charAt(0)}

          </div>

          {/* USER INFO */}
          <h1 className="text-4xl md:text-5xl font-black mt-8 break-words">

            {name}

          </h1>

          <p className="text-slate-400 mt-3 text-sm md:text-lg break-all">

            {email}

          </p>

          {/* BUTTON */}
          <button
            onClick={() =>
              setEditing(true)
            }
            className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 font-bold text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >

            Edit Profile

          </button>

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-8">

          {/* ACCOUNT INFO */}
          <div className="p-10 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl">

            <h2 className="text-3xl md:text-4xl font-black mb-10">

              Account Information

            </h2>

            <div className="space-y-8">

              <div>

                <p className="text-slate-400">

                  Full Name

                </p>

                <h3 className="text-2xl md:text-3xl font-bold mt-2 break-words">

                  {name}

                </h3>

              </div>

              <div>

                <p className="text-slate-400">

                  Email Address

                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-2 break-all">

                  {email}

                </h3>

              </div>

              <div>

                <p className="text-slate-400">

                  Membership

                </p>

                <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mt-2">

                  Premium User

                </h3>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="p-10 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl">

            <h2 className="text-3xl md:text-4xl font-black mb-10">

              Statistics

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* EXPENSES */}
              <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                <p className="text-slate-400">

                  Expenses

                </p>

                <h1 className="text-3xl md:text-5xl font-black text-cyan-400 mt-4">

                  ₹ {totalExpenses}

                </h1>

              </div>

              {/* INCOME */}
              <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20">

                <p className="text-slate-400">

                  Income

                </p>

                <h1 className="text-3xl md:text-5xl font-black text-purple-400 mt-4">

                  ₹ {totalIncome}

                </h1>

              </div>

              {/* SAVINGS */}
              <div className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/20">

                <p className="text-slate-400">

                  Savings

                </p>

                <h1 className="text-3xl md:text-5xl font-black text-pink-400 mt-4">

                  ₹ {savings}

                </h1>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}
      {editing && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">

          <div className="w-full max-w-xl p-10 rounded-[30px] bg-[#111827] border border-white/10">

            <h2 className="text-4xl font-black mb-8">

              Edit Profile

            </h2>

            <div className="space-y-6">

              <input
                type="text"
                value={name}
                onChange={e =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-2xl bg-[#1e293b] border border-white/10 outline-none text-white"
              />

              <input
                type="email"
                value={email}
                onChange={e =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-2xl bg-[#1e293b] border border-white/10 outline-none text-white"
              />

              <div className="flex flex-col md:flex-row gap-4 pt-4">

                <button
                  onClick={
                    handleSave
                  }
                  className="flex-1 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-slate-900"
                >

                  Save

                </button>

                <button
                  onClick={() =>
                    setEditing(
                      false
                    )
                  }
                  className="flex-1 p-4 rounded-2xl bg-red-500/20 border border-red-500/30"
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </DashboardLayout>
  )
}

export default Profile