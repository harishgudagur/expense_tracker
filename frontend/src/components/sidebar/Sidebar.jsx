// src/components/sidebar/Sidebar.jsx

import {
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart3,
  User,
  LogOut,
} from 'lucide-react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { motion } from 'framer-motion'

function Sidebar() {
  const location = useLocation()

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('user')

    navigate('/')
  }

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <LayoutDashboard
          size={22}
        />
      ),
    },
    {
      name: 'Expenses',
      path: '/expenses',
      icon: (
        <Receipt size={22} />
      ),
    },
    {
      name: 'Income',
      path: '/income',
      icon: (
        <Wallet size={22} />
      ),
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: (
        <BarChart3 size={22} />
      ),
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: (
        <User size={22} />
      ),
    },
  ]

  return (
    <motion.aside
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="w-[320px] h-screen bg-[#081121]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between px-5 py-8 overflow-hidden"
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <Link to="/dashboard">

          <div className="mb-16 px-4">

            <div className="leading-none">

              <h1 className="text-[42px] font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

                Expense

              </h1>

              <h1 className="text-[42px] font-black tracking-tight text-white -mt-1">

                Flow

              </h1>

            </div>

            <p className="text-slate-500 text-sm mt-4 tracking-wide">

              Smart Finance Tracker

            </p>

          </div>

        </Link>

        {/* NAVIGATION */}
        <div className="space-y-4">

          {navItems.map(item => {
            const isActive =
              location.pathname ===
              item.path

            return (
              <Link
                key={item.path}
                to={item.path}
              >

                <motion.div
                  whileHover={{
                    x: 6,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)]'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >

                  <div>

                    {item.icon}

                  </div>

                  <span className="font-semibold text-lg">

                    {item.name}

                  </span>

                </motion.div>

              </Link>
            )
          })}

        </div>

      </div>

      {/* LOGOUT */}
      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={logoutHandler}
        className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all duration-300"
      >

        <LogOut size={22} />

        <span className="font-semibold text-lg">

          Logout

        </span>

      </motion.button>

    </motion.aside>
  )
}

export default Sidebar