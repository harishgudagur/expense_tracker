import {
  useState,
  useContext,
  useEffect,
} from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import toast from 'react-hot-toast'

import API from '../services/api'

import { AuthContext } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()

  const { login } =
    useContext(AuthContext)

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    })

  // REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token =
      localStorage.getItem('token')

    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  // HANDLE INPUT CHANGE
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  // HANDLE LOGIN
  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } =
        await API.post(
          '/auth/login',
          formData
        )

      // SAVE TOKEN
      localStorage.setItem(
        'token',
        data.token
      )

      // SAVE USER
      localStorage.setItem(
        'user',
        JSON.stringify(
          data.user
        )
      )

      // LOGIN CONTEXT
      login(data)

      toast.success(
        `Welcome ${data.user.name}`
      )

      navigate('/dashboard')
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          'Invalid credentials'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 overflow-hidden relative">

      {/* CYAN GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      {/* PURPLE GLOW */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full"></div>

      {/* LOGIN CARD */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative z-10 w-full max-w-md p-8 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl"
      >

        {/* LOGO */}
        <div className="mb-8 text-center">

          <h1 className="text-5xl font-black leading-none">

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Expense

            </span>

            <br />

            <span className="text-white">

              Flow

            </span>

          </h1>

          <p className="text-slate-400 mt-3">

            Smart Finance Tracker

          </p>

        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-white">

          Welcome Back 👋

        </h2>

        <p className="text-center text-slate-400 mt-3">

          Login to continue managing your finances

        </p>

        {/* FORM */}
        <div className="mt-8 space-y-5">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white placeholder:text-slate-400 focus:border-cyan-400 transition"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white placeholder:text-slate-400 focus:border-cyan-400 transition"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] text-slate-900 font-black transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >

            {loading
              ? 'Logging in...'
              : 'Login'}

          </button>

        </div>

      </motion.form>

    </div>
  )
}

export default Login