import  React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance, { setAuthToken } from "../../Config/axios"
import { login } from "../../store/authSlice"
import { useDispatch } from "react-redux"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
      if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      const response = await  axiosInstance.post("/auth/login", {
        username,
        password,
      })
      const { token, username: returnedUsername, role } = response.data;
      setAuthToken(token);
      dispatch(login({ username: returnedUsername, role, token, city: response.data.city }));
      navigate('/dashboard');
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
       <div className="h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-6xl  grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex flex-col justify-center p-6"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                  <Users className="w-12  h-12 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                  Community Connect
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Join thousands of citizens making their communities better.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: Shield,
                      title: "Secure & Private",
                      desc: "Your data is protected with enterprise-grade security",
                    },
                    { icon: Users, title: "Community Driven", desc: "Connect with neighbors who care" },
                    { icon: Zap, title: "Fast Response", desc: "Quick updates on reported issues" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20"
                    >
                      <div className="w-12  h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex  items-center justify-center"
            >
              <div className="w-full relative max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-[80vh] flex flex-col">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-3 shadow-md lg:hidden">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="flex-1 space-y-4 mt-5">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Mail className="w-4 h-4 text-blue-500" />
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all "
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Lock className="w-4 h-4text-blue-500" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all "
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="" /> : <Eye className="" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex absolute bottom-30 items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className=" text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="px-2 text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-95 flex absolute bottom-20 items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600  text-white font-semibold rounded-lg transition-all ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-indigo-700"
                    }`}
                  >
                    {isLoading ? (
                      <div className=" border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
  )
}
