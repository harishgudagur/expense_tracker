import Sidebar from '../components/sidebar/Sidebar'

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-50">

        <Sidebar />

      </div>

      {/* Main Content */}
      <div className="ml-[320px] min-h-screen relative z-10">

        <main className="px-10 py-8">

          <div className="max-w-[1600px] mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>
  )
}

export default DashboardLayout