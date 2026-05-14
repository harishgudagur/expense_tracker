import {
  Search,
  Bell,
} from 'lucide-react'

import {
  useState,
  useMemo,
} from 'react'

function DashboardHeader({
  expenses = [],
  setFilteredExpenses,
}) {
  const [search, setSearch] =
    useState('')

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false)

  // USER
  const user = JSON.parse(
    localStorage.getItem('user')
  )

  const userName =
    user?.name || 'User'

  const userEmail =
    user?.email || ''

  const userInitial =
    userName.charAt(0)

  // DATE
  const today =
    new Date().toLocaleDateString(
      'en-US',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    )

  // SEARCH
  const handleSearch = e => {
    const value = e.target.value

    setSearch(value)

    const filtered =
      (expenses || []).filter(
        item =>
          item.title
            ?.toLowerCase()
            .includes(
              value.toLowerCase()
            )
      )

    if (
      setFilteredExpenses
    ) {
      setFilteredExpenses(
        filtered
      )
    }
  }

  // GREETING
  const greeting =
    useMemo(() => {
      const hour =
        new Date().getHours()

      if (hour < 12)
        return 'Good Morning'

      if (hour < 18)
        return 'Good Afternoon'

      return 'Good Evening'
    }, [])

  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-10">

      {/* LEFT */}
      <div>

        <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight">

          {greeting},{' '}

          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            {userName}

          </span>

          <span className="inline-block ml-3 animate-bounce">

            👋

          </span>

        </h1>

        <p className="text-slate-400 mt-4 text-base md:text-lg">

          {today}

        </p>

      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

        {/* SEARCH */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl w-full sm:w-[340px] focus-within:border-cyan-400 transition-all">

          <Search
            size={20}
            className="text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={
              handleSearch
            }
            placeholder="Search expenses..."
            className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
          />

        </div>

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition"
          >

            <Bell
              size={22}
              className="text-white"
            />

            {/* DOT */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>

          </button>

          {/* DROPDOWN */}
          {showNotifications && (

            <div className="absolute right-0 mt-4 w-[320px] p-5 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl z-50">

              <h3 className="text-xl font-black mb-4">

                Notifications

              </h3>

              <div className="space-y-4">

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                  <p className="font-semibold">

                    Budget Update

                  </p>

                  <p className="text-sm text-slate-400 mt-1">

                    Your expenses are under control.

                  </p>

                </div>

                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">

                  <p className="font-semibold">

                    Monthly Report

                  </p>

                  <p className="text-sm text-slate-400 mt-1">

                    Your monthly analytics are ready.

                  </p>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* USER CARD */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl min-w-[240px]">

          {/* AVATAR */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">

            {userInitial}

          </div>

          {/* USER INFO */}
          <div className="overflow-hidden">

            <h3 className="font-bold text-white text-lg truncate">

              {userName}

            </h3>

            <p className="text-slate-400 text-sm truncate max-w-[140px]">

              {userEmail}

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardHeader