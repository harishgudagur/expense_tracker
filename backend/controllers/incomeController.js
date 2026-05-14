import Income from '../models/Income.js'

// ADD INCOME
export const addIncome =
  async (req, res) => {
    try {
      const { source, amount } =
        req.body

      if (!source || !amount) {
        return res.status(400).json({
          message:
            'Please fill all fields',
        })
      }

      const income =
        await Income.create({
          user: req.user._id,
          source,
          amount,
        })

      res.status(201).json(
        income
      )
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// GET ALL INCOME
export const getIncome =
  async (req, res) => {
    try {
      const income =
        await Income.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        })

      res.json(income)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }