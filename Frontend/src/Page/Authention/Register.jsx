import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight, ArrowLeft, Shield, Users, Zap, UserPlus, Building, Check } from 'lucide-react'
import { motion } from "framer-motion"
import { register } from "../../store/authSlice"
import axiosInstance, { setAuthToken } from "../../Config/axios"

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
      const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        role: "CITIZEN",
        departmentCategory: "",
        termsAccepted: false
      })
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
      const [error, setError] = useState("")
      const [isLoading, setIsLoading] = useState(false)
        const dispatch = useDispatch()
        const navigate = useNavigate()

      const totalSteps = 3

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ 
          ...prev, 
          [name]: type === 'checkbox' ? checked : value 
        }))
        setError("")
      }

      const validateStep = (step) => {
        switch (step) {
          case 1:
            if (!formData.username || !formData.email) {
              setError("Please fill in all required fields")
              return false
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
              setError("Please enter a valid email address")
              return false
            }
            break
          case 2:
            if (!formData.city || !formData.role) {
              setError("Please fill in all required fields")
              return false
            }
            if (formData.role === "DEPARTMENT" && !formData.departmentCategory) {
              setError("Please select your department category")
              return false
            }
            break
          case 3:
            if (!formData.password || !formData.confirmPassword) {
              setError("Please fill in all required fields")
              return false
            }
            if (formData.password !== formData.confirmPassword) {
              setError("Passwords do not match")
              return false
            }
            if (formData.password.length < 6) {
              setError("Password must be at least 6 characters long")
              return false
            }
            if (!formData.termsAccepted) {
              setError("Please accept the Terms of Service and Privacy Policy")
              return false
            }
            break
        }
        return true
      }

      const nextStep = () => {
        if (validateStep(currentStep)) {
          setCurrentStep(prev => Math.min(prev + 1, totalSteps))
          setError("")
        }
      }

      const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
        setError("")
      }

      const handleRegister = async (e) => {
        e.preventDefault()
        if (!validateStep(3)) return
        setIsLoading(true)
        setError("")
        try {
      const response = await axiosInstance.post("/auth/register", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            city: formData.city,
            role: formData.role,
      })

      const loginResponse = await axiosInstance.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      })

      const { token, username: returnedUsername, role: returnedRole } = loginResponse.data
      setAuthToken(token)
      dispatch(register({ username: returnedUsername, role: returnedRole, token }))
      navigate("/dashboard")
        } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
          setIsLoading(false)
        }
      }

      const roles = [
        { value: "CITIZEN", label: "Citizen", icon: Users, desc: "Report and track community issues" },
        { value: "DEPARTMENT", label: "Department", icon: Building, desc: "Manage and resolve reported issues" }
      ]

      const categories = [
        { value: "ROADS_INFRASTRUCTURE", label: "Roads & Infrastructure" },
        { value: "STREET_LIGHTING", label: "Street Lighting" },
        { value: "WASTE_MANAGEMENT", label: "Waste Management" },
        { value: "WATER_DRAINAGE", label: "Water & Drainage" },
        { value: "PUBLIC_SAFETY", label: "Public Safety" },
        { value: "PARKS_RECREATION", label: "Parks & Recreation" },
        { value: "TRAFFIC_TRANSPORTATION", label: "Traffic & Transportation" },
        { value: "OTHER", label: "Other" },
      ]

      const stepTitles = {
        1: "Personal Information",
        2: "Account Details", 
        3: "Security & Terms"
      }

      const stepDescriptions = {
        1: "Let's start with your basic information",
        2: "Tell us about your role and location",
        3: "Set up your password and review terms"
      }

      return (
        <div className="h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-7xl  grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Side */}
            <div className="hidden lg:flex flex-col justify-center p-6">
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                  Join Our Community
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Be part of the change you want to see. Register now and start making a difference.
                </p>
                <div className="w-full">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Registration Progress</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
                        step === currentStep ? "bg-blue-100 border border-blue-200" :
                        step < currentStep ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                      }`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-smfont-semibold ${
                          step === currentStep ? "bg-blue-500 text-white" :
                          step < currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                        }`}>
                          {step < currentStep ? <Check className="w-3 h-3" /> : step}
                        </div>
                        <div>
                          <p className={`font-bold  ${
                            step === currentStep ? "text-blue-700" :
                            step < currentStep ? "text-green-700" : "text-gray-600"
                          }`}>
                            {stepTitles[step]}
                          </p>
                          <p className="text-smtext-gray-500">{stepDescriptions[step]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-[80vh] flex flex-col">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-3 shadow-md lg:hidden">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Create Account</h2>
                  <p className=" text-gray-600">{stepDescriptions[currentStep]}</p>
                </div>

                <div className="lg:hidden mb-4">
                  <div className="flex items-center justify-between text-smmb-1">
                    <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
                    <span className="text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                    {error}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <User className="w-4 h-4 text-blue-500" />
                          Username *
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
                          placeholder="Choose a username"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Mail className="w-4 h-4 text-blue-500" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-smfont-semibold text-gray-700">
                          <Building className="w-4 h-4 text-blue-500" />
                          Account Type *
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {roles.map((role) => (
                            <button
                              key={role.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, role: role.value, departmentCategory: "" }))}
                              className={`p-3 rounded-lg border transition-all text-left text-sm ${
                                formData.role === role.value
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  formData.role === role.value 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-200 text-gray-600"
                                }`}>
                                  <role.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className={`font-medium ${formData.role === role.value ? "text-blue-700" : "text-gray-900"}`}>
                                    {role.label}
                                  </p>
                                  <p className="text-smtext-gray-600">{role.desc}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      {formData.role === "DEPARTMENT" && (
                        <div className="space-y-1">
                          <label className="flex items-center gap-2 text-smfont-semibold text-gray-700">
                            <Building className="w-4 h-4 text-blue-500" />
                            Department Category *
                          </label>
                          <select
                            name="departmentCategory"
                            value={formData.departmentCategory}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
                            required
                          >
                            <option value="">Select your category</option>
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-smfont-semibold text-gray-700">
                          <Lock className="w-4 h-4 text-blue-500" />
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
                            placeholder="Create a password (min 6 characters)"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-smfont-semibold text-gray-700">
                          <Lock className="w-4 h-4 text-blue-500" />
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-sm"
                            placeholder="Confirm your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <input
                          type="checkbox"
                          id="terms"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          required
                        />
                        <label htmlFor="terms" className="text-smtext-gray-700">
                          I agree to the{" "}
                          <span className="text-blue-600 hover:text-blue-700 font-medium underline cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-blue-600 hover:text-blue-700 font-medium underline cursor-pointer">
                            Privacy Policy
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 hover:bg-gray-200 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                  )}
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRegister}
                      disabled={isLoading}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg transition-all ${
                        isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-emerald-700"
                      }`}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Create Account
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-smtext-gray-600">
                    Already have an account?{" "}
                     <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                      Sign in here
                    </Link >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}