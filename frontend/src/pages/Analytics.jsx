import {
  useEffect,
  useState,
} from 'react'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

import DashboardLayout from '../layouts/DashboardLayout'

import API from '../services/api'

const COLORS = [
  '#06b6d4',
  '#8b5cf6',
  '#ec4899',
  '#22c55e',
  '#f59e0b',
]

function Analytics() {
  const [expenses, setExpenses] =
    useState([])

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

  // CATEGORY DATA
  const categoryMap = {}

  expenses.forEach(item => {
    if (
      categoryMap[item.category]
    ) {
      categoryMap[
        item.category
      ] += item.amount
    } else {
      categoryMap[
        item.category
      ] = item.amount
    }
  })

  const pieData =
    Object.keys(categoryMap).map(
      key => ({
        name: key,
        value:
          categoryMap[key],
      })
    )

  // MONTHLY DATA
  const monthlyData = [
    {
      month: 'Jan',
      amount: 12000,
    },
    {
      month: 'Feb',
      amount: 18000,
    },
    {
      month: 'Mar',
      amount: 9000,
    },
    {
      month: 'Apr',
      amount: 23000,
    },
    {
      month: 'May',
      amount: 16000,
    },
  ]

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl md:text-7xl font-black">

          Analytics

        </h1>

        <p className="text-slate-400 mt-4 text-xl">

          Financial insights and spending trends

        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl">

          <h2 className="text-4xl font-black mb-10">

            Expense Categories

          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >

                {pieData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* LINE CHART */}
        <div className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl">

          <h2 className="text-4xl font-black mb-10">

            Monthly Expenses

          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <LineChart
              data={monthlyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#06b6d4"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Analytics