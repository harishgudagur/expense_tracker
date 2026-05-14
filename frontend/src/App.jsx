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

import ProtectedRoute from './routes/ProtectedRoute'

// LAZY IMPORTS
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

const ForgotPassword =
  lazy(() =>
    import(
      './pages/ForgotPassword'
    )
  )

const ResetPassword =
  lazy(() =>
    import(
      './pages/ResetPassword'
    )
  )

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

          {/* PUBLIC */}

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
            element={
              <Register />
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ForgotPassword />
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <ResetPassword />
            }
          />

          {/* PROTECTED */}

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