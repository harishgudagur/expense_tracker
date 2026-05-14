import crypto from 'crypto'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import User from '../models/User.js'

import sendEmail from '../utils/sendEmail.js'

// GENERATE JWT TOKEN
const generateToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

// REGISTER USER
export const registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body

      const userExists =
        await User.findOne({
          email,
        })

      if (userExists) {
        return res
          .status(400)
          .json({
            message:
              'User already exists',
          })
      }

      const salt =
        await bcrypt.genSalt(10)

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        )

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
        })

      res.status(201).json({
        _id: user._id,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },

        token: generateToken(
          user._id
        ),
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// LOGIN USER
export const loginUser =
  async (req, res) => {
    try {
      const { email, password } =
        req.body

      const user =
        await User.findOne({
          email,
        })

      if (
        user &&
        (await bcrypt.compare(
          password,
          user.password
        ))
      ) {
        res.json({
          _id: user._id,

          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },

          token:
            generateToken(
              user._id
            ),
        })
      } else {
        res.status(401).json({
          message:
            'Invalid credentials',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// FORGOT PASSWORD
export const forgotPassword =
  async (req, res) => {
    try {
      const { email } =
        req.body

      const user =
        await User.findOne({
          email,
        })

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              'User not found',
          })
      }

      const resetToken =
        crypto
          .randomBytes(32)
          .toString('hex')

      user.resetPasswordToken =
        resetToken

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000

      await user.save()

      const resetUrl =
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`

      await sendEmail(
        user.email,
        'Reset Password',

        `
        <h2>Password Reset</h2>

        <p>Click below to reset your password:</p>

        <a href="${resetUrl}">
          ${resetUrl}
        </a>
        `
      )

      res.json({
        message:
          'Password reset email sent',
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// RESET PASSWORD
export const resetPassword =
  async (req, res) => {
    try {
      const { token } =
        req.params

      const { password } =
        req.body

      const user =
        await User.findOne({
          resetPasswordToken:
            token,

          resetPasswordExpire: {
            $gt: Date.now(),
          },
        })

      if (!user) {
        return res
          .status(400)
          .json({
            message:
              'Invalid or expired token',
          })
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )

      user.password =
        hashedPassword

      user.resetPasswordToken =
        undefined

      user.resetPasswordExpire =
        undefined

      await user.save()

      res.json({
        message:
          'Password reset successful',
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }