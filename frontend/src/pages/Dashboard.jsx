import {
  useEffect,
  useState,
} from 'react'

import DashboardLayout from '../layouts/DashboardLayout'

import DashboardHeader from '../components/dashboard/DashboardHeader'

import StatsCard from '../components/dashboard/StatsCard'

import ExpenseTable from '../components/table/ExpenseTable'

import PieChartBox from '../components/charts/PieChartBox'

import LineChartBox from '../components/charts/LineChartBox'

import AddExpenseForm from '../components/dashboard/AddExpenseForm'

import API from '../services/api'

import AddIncomeForm from '../components/dashboard/AddIncomeForm'

function Dashboard() {
  const [expenses, setExpenses] =
    useState([])

  const [income, setIncome] =
    useState([])

  const [search, setSearch] = useState('')

  const filteredExpenses =
    expenses.filter(item =>
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.category
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

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
    fetchExpenses()

    fetchIncome()
  }, [])

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

  const remainingBalance =
    totalIncome - totalExpenses

  const savingsPercentage =
    totalIncome > 0
      ? (
          (remainingBalance /
            totalIncome) *
          100
        ).toFixed(1)
      : 0

  return (
    <DashboardLayout>

      <DashboardHeader
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatsCard
          title="Income"
          amount={totalIncome}
        />

        <StatsCard
          title="Expenses"
          amount={totalExpenses}
        />

        <StatsCard
          title="Balance"
          amount={
            remainingBalance
          }
        />

        <StatsCard
          title="Savings %"
          amount={`${savingsPercentage}%`}
        />

      </div>

      <AddExpenseForm
        fetchExpenses={
          fetchExpenses
        }
      />
      <AddIncomeForm
        fetchIncome={fetchIncome}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        <PieChartBox
          expenses={expenses}
        />

        <LineChartBox
          expenses={expenses}
        />

      </div>

      <ExpenseTable
        expenses={expenses}
        income={income}
        fetchExpenses={fetchExpenses}
      />

    </DashboardLayout>
  )
}

export default Dashboard