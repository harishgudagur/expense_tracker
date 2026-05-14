import { motion } from 'framer-motion'

function StatsCard({ title, amount }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden p-8 rounded-[30px] bg-[#111827]/80 backdrop-blur-2xl border border-white/10 shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <h3 className="text-slate-400 text-lg">
        {title}
      </h3>

      <h1 className="text-5xl font-black mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        ₹ {amount}
      </h1>
    </motion.div>
  )
}

export default StatsCard