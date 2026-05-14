const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  getIncome,
  addIncome,
  deleteIncome,
} = require('../controllers/incomeController')

router.get('/', protect, getIncome)

router.post('/', protect, addIncome)

router.delete(
  '/:id',
  protect,
  deleteIncome
)

module.exports = router