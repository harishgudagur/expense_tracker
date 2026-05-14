import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS = [
  '#06b6d4',
  '#8b5cf6',
  '#ec4899',
  '#22c55e',
  '#f59e0b',
]

function PieChartBox({
  expenses = [],
}) {

  // PREVENT CRASH
  if (!expenses.length) {
    return (
      <div className="p-8 rounded-[30px] bg-[#111827]/80 border border-white/10 flex items-center justify-center min-h-[420px]">

        <div className="text-center">

          <h2 className="text-3xl font-black mb-4">

            Expense Categories

          </h2>

          <p className="text-slate-400 text-lg">

            No expense data available

          </p>

        </div>

      </div>
    )
  }

  // CATEGORY TOTALS
  const categoryMap = {}

  expenses.forEach(item => {

    const category =
      item.category || 'Others'

    const amount =
      Number(item.amount) || 0

    if (categoryMap[category]) {

      categoryMap[category] +=
        amount

    } else {

      categoryMap[category] =
        amount

    }
  })

  // CHART DATA
  const data = Object.keys(
    categoryMap
  ).map(key => ({
    name: key,
    value: categoryMap[key],
  }))

  return (
    <div className="p-8 rounded-[30px] bg-[#111827]/80 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.03)]">

      <h2 className="text-4xl font-black mb-10">

        Expense Categories

      </h2>

      <ResponsiveContainer
        width="100%"
        height={500}
      >

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label={({ name, value }) =>
              `${name} ₹${value}`
            }
          >

            {data.map(
              (entry, index) => (
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
  )
}

export default PieChartBox