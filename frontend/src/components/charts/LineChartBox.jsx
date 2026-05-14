import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function LineChartBox({
  expenses,
}) {
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
    <div className="p-8 rounded-[30px] bg-[#111827]/80 border border-white/10">

      <h2 className="text-3xl font-black mb-10">
        Monthly Expenses
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart
          data={monthlyData}
        >

          <XAxis dataKey="month" />

          <YAxis />

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
  )
}

export default LineChartBox