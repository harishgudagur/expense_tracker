const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require('../controllers/expenseController')

router.get(
  '/',
  protect,
  getExpenses
)

router.post(
  '/',
  protect,
  addExpense
)

router.delete(
  '/:id',
  protect,
  deleteExpense
)

module.exports = router