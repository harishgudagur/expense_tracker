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

  const { login } = useContext(AuthContext)

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      navigate('/dashboard')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await API.post(
        '/auth/login',
        formData
      )

      login(data)

      toast.success('Login successful')

      navigate('/dashboard')
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Invalid credentials'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full"></div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10"
      >

        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Login to continue managing your finances
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-cyan-400"
          />

          <button className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-all duration-300">
            Login
          </button>

        </div>

      </motion.form>
    </div>
  )
}

export default Login