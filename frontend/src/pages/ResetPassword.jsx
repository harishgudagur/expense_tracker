import { useState } from 'react'

import { useParams } from 'react-router-dom'

import toast from 'react-hot-toast'

import API from '../services/api'

function ResetPassword() {
  const { token } =
    useParams()

  const [password,
    setPassword,
  ] = useState('')

  const handleSubmit =
    async e => {
      e.preventDefault()

      try {
        const { data } =
          await API.post(
            `/auth/reset-password/${token}`,
            { password }
          )

        toast.success(
          data.message
        )
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message
        )
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">

      <form
        onSubmit={
          handleSubmit
        }
        className="w-full max-w-md p-8 rounded-3xl bg-white/10 border border-white/10"
      >

        <h1 className="text-4xl font-bold text-cyan-400 text-center">

          Reset Password

        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e =>
            setPassword(
              e.target.value
            )
          }
          className="w-full mt-8 px-4 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
        />

        <button className="w-full mt-6 py-4 rounded-2xl bg-cyan-500 text-black font-bold">

          Reset Password

        </button>

      </form>

    </div>
  )
}

export default ResetPassword