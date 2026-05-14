import { useState } from 'react'

import {
  Bell,
  Search,
} from 'lucide-react'

function DashboardHeader() {
  const [search, setSearch] =
    useState('')

  return (
    <div className="flex items-center justify-between mb-10">

      <div>

        <h1 className="text-4xl md:text-7xl font-black">

          Welcome Back 👋

        </h1>

        <p className="text-slate-400 mt-3 text-xl">

          Here’s your financial overview.

        </p>

      </div>

      <div className="flex items-center gap-5">

        {/* SEARCH */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-[#111827]/70">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={e =>
              setSearch(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-white placeholder:text-slate-500"
          />

        </div>

        {/* NOTIFICATION */}
        <button className="w-14 h-14 rounded-2xl border border-white/10 bg-[#111827]/70 flex items-center justify-center hover:border-cyan-400 transition-all">

          <Bell
            size={20}
            className="text-white"
          />

        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-[#111827]/70">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-bold">

            H

          </div>

          <div>

            <h3 className="font-bold">

              Harish Gudagur

            </h3>

            <p className="text-sm text-slate-400">

              Premium User

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardHeader