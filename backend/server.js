import express from 'express'

import dotenv from 'dotenv'

import cors from 'cors'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'

import expenseRoutes from './routes/expenseRoutes.js'

import incomeRoutes from './routes/incomeRoutes.js'

// CONFIG
dotenv.config()

// CONNECT DATABASE
connectDB()

const app = express()

// MIDDLEWARE
app.use(express.json())

// CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',

      'https://expense-tracker-beta-teal.vercel.app',
    ],

    credentials: true,
  })
)

// TEST ROUTE
app.get('/', (req, res) => {
  res.send(
    'Expense Tracker API Running'
  )
})

// ROUTES
app.use(
  '/api/auth',
  authRoutes
)

app.use(
  '/api/expenses',
  expenseRoutes
)

app.use(
  '/api/income',
  incomeRoutes
)

// PORT
const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  )
})