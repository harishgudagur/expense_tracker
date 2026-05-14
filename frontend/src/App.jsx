import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import {
  lazy,
  Suspense,
} from 'react'

import { Toaster } from 'react-hot-toast'

const Home = lazy(() =>
  import('./pages/Home')
)
const Login = lazy(() =>
  import('./pages/Login')
)
const Register = lazy(() =>
  import('./pages/Register')
)
const Dashboard = lazy(() =>
  import('./pages/Dashboard')
)

const Expenses = lazy(() =>
  import('./pages/Expenses')
)

const Income = lazy(() =>
  import('./pages/Income')
)

const Analytics = lazy(() =>
  import('./pages/Analytics')
)

const Profile = lazy(() =>
  import('./pages/Profile')
)

import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>

      <Toaster position="top-right" />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white text-3xl font-bold">
            Loading...
          </div>
        }
      >
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App