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

function Income() {
  const [income, setIncome] =
    useState([])

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

  const chartData =
    income.map(item => ({
      name: item.source,
      value: item.amount,
    }))

  const totalIncome =
    income.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    )

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-4xl md:text-7xl font-black">

          Income

        </h1>

        <p className="text-slate-400 mt-4 text-xl">

          Track all your income sources

        </p>

      </div>

      {/* TOTAL CARD */}
      <div className="mb-10 p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

        <p className="text-slate-400 text-lg">

          Total Income

        </p>

        <h1 className="text-4xl md:text-7xl font-black text-cyan-400 mt-5">

          ₹ {totalIncome}

        </h1>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CHART */}
        <div className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

          <h2 className="text-4xl font-black mb-10">

            Income Sources

          </h2>

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >

                {chartData.map(
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

        {/* INCOME LIST */}
        <div className="space-y-6">

          {income.length ===
          0 ? (
            <div className="p-10 rounded-[30px] border border-white/10 bg-[#111827]/70 text-center text-slate-400 text-xl">

              No income added yet

            </div>
          ) : (
            income.map(item => (
              <div
                key={item._id}
                className="p-8 rounded-[30px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]"
              >

                <p className="text-slate-400 text-lg">

                  {item.source}

                </p>

                <h1 className="text-3xl md:text-6xl font-black text-green-400 mt-5">

                  ₹ {item.amount}

                </h1>

              </div>
            ))
          )}

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Income