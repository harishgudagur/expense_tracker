import { Trash2 } from 'lucide-react'

import toast from 'react-hot-toast'

import API from '../../services/api'

function ExpenseTable({
  expenses,
  income,
  fetchExpenses,
}) {
  const deleteHandler = async id => {
    try {
      await API.delete(
        `/expenses/${id}`
      )

      toast.success(
        'Expense deleted'
      )

      fetchExpenses()
    } catch (_error) {
      toast.error(
        'Delete failed'
      )
    }
  }

  // Combine Transactions
  const transactions = [
    ...expenses.map(item => ({
      ...item,
      type: 'expense',
    })),

    ...income.map(item => ({
      ...item,
      title: item.source,
      category: 'income',
      type: 'income',
    })),
  ]

  return (
    <div className="mt-10 rounded-[30px] overflow-hidden border border-white/10 bg-[#0f172a]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

      {/* Header */}
      <div className="p-8 border-b border-white/5">

        <h1 className="text-5xl font-black">

          Recent Transactions

        </h1>

        <p className="text-slate-400 mt-3">

          Track and manage your latest financial activities

        </p>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>

              <th className="text-left px-8 py-6 text-lg">

                Title

              </th>

              <th className="text-left px-8 py-6 text-lg">

                Category

              </th>

              <th className="text-left px-8 py-6 text-lg">

                Type

              </th>

              <th className="text-left px-8 py-6 text-lg">

                Amount

              </th>

              <th className="text-left px-8 py-6 text-lg">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.length ===
            0 ? (
              <tr>

                <td
                  colSpan="5"
                  className="text-center py-20 text-slate-400 text-xl"
                >

                  No transactions yet

                </td>

              </tr>
            ) : (
              transactions.map(item => (
                <tr
                  key={item._id}
                  className="border-t border-white/5 hover:bg-white/[0.03] transition-all duration-300"
                >

                  {/* TITLE */}
                  <td className="px-8 py-7">

                    <h3 className="font-bold text-xl">

                      {item.title}

                    </h3>

                    <p className="text-slate-400 mt-1">

                      {item.type ===
                      'income'
                        ? 'Income Transaction'
                        : 'Expense Transaction'}

                    </p>

                  </td>

                  {/* CATEGORY */}
                  <td className="px-8 py-7">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                        item.type ===
                        'income'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20'
                      }`}
                    >

                      {item.category}

                    </span>

                  </td>

                  {/* TYPE */}
                  <td className="px-8 py-7">

                    <span
                      className={`font-bold capitalize ${
                        item.type ===
                        'income'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >

                      {item.type}

                    </span>

                  </td>

                  {/* AMOUNT */}
                  <td className="px-8 py-7">

                    <h2
                      className={`text-3xl font-black ${
                        item.type ===
                        'income'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >

                      ₹ {item.amount}

                    </h2>

                  </td>

                  {/* ACTION */}
                  <td className="px-8 py-7">

                    {item.type ===
                    'expense' ? (
                      <button
                        onClick={() =>
                          deleteHandler(
                            item._id
                          )
                        }
                        className="px-5 py-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition-all duration-300 flex items-center gap-2"
                      >

                        <Trash2
                          size={18}
                        />

                        Delete

                      </button>
                    ) : (
                      <span className="text-slate-500">

                        —

                      </span>
                    )}

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ExpenseTable