const Expense = require('../models/Expense')

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user._id,
    })

    res.json(expenses)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const addExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      category,
    } = req.body

    const expense =
      await Expense.create({
        user: req.user._id,
        title,
        amount,
        category,
      })

    res.status(201).json(expense)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const deleteExpense = async (
  req,
  res
) => {
  try {
    const expense =
      await Expense.findById(
        req.params.id
      )

    if (!expense) {
      return res.status(404).json({
        message:
          'Expense not found',
      })
    }

    await expense.deleteOne()

    res.json({
      message:
        'Expense deleted',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
}