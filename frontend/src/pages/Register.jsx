import {
  useState,
  useContext,
} from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import toast from 'react-hot-toast'

import API from '../services/api'

import { AuthContext } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()

  const { login } =
    useContext(AuthContext)

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
    })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } =
        await API.post(
          '/auth/register',
          formData
        )

      login({
        ...data.user,
        token: data.token,
      })

      toast.success(
        'Registration successful'
      )

      navigate('/dashboard')
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          'Something went wrong'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">

      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-md p-8 rounded-[30px] bg-[#111827]/80 backdrop-blur-2xl border border-white/10"
      >

        <h1 className="text-5xl font-black text-center mb-10">
          Create Account
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-[#1e293b] border border-white/10 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-[#1e293b] border border-white/10 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-[#1e293b] border border-white/10 outline-none"
          />

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-slate-900">
            Register
          </button>

        </div>

      </motion.form>

    </div>
  )
}

export default Register