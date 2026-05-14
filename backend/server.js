const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

const connectDB = require('./config/db')

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('ExpenseFlow API Running')
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/expenses', require('./routes/expenseRoutes'))
app.use(
  '/api/income',
  require('./routes/incomeRoutes')
)
app.use(
  '/api/expenses',
  require('./routes/expenseRoutes')
)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})