"use client"

import { useParams } from "react-router-dom"
import { ArrowLeft, MapPin, User, Calendar, Heart, Tag, Clock, AlertCircle } from 'lucide-react'
import { motion } from "framer-motion"

const IssueDetails = () => {
  const { id } = useParams()

  // Mock data - replace with actual API call
  const issueData = {
    id: id,
    title: "Large Pothole on Main Street",
    description: "There is a deep pothole causing significant damage to vehicles near the intersection. The pothole has been growing larger over the past few weeks and poses a serious safety hazard to drivers, especially during nighttime. Multiple residents have reported vehicle damage, and it needs immediate attention from the city maintenance department.",
    status: "In Progress",
    location: "Main St & 5th Ave, Downtown",
    reportedBy: "John Doe",
    date: "2024-01-15",
    likes: 23,
    category: "Roads",
    priority: "High",
    estimatedResolution: "2-3 weeks",
    images: [
      "/placeholder.svg?height=300&width=400&text=Pothole+Image+1",
      "/placeholder.svg?height=300&width=400&text=Pothole+Image+2"
    ]
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Issues
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issue Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Title and Status */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{issueData.title}</h1>
                  <p className="text-gray-600">Issue ID: #{issueData.id}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issueData.status)}`}>
                    {issueData.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(issueData.priority)}`}>
                    {issueData.priority} Priority
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{issueData.description}</p>
              </div>
            </div>

            {/* Images */}
            {issueData.images && issueData.images.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Photos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {issueData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Issue photo ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border border-gray-200 group-hover:shadow-lg transition-shadow"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Info */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Issue Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{issueData.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Reported by</p>
                    <p className="font-medium text-gray-900">{issueData.reportedBy}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date Reported</p>
                    <p className="font-medium text-gray-900">{issueData.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{issueData.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Resolution</p>
                    <p className="font-medium text-gray-900">{issueData.estimatedResolution}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors font-medium">
                  <Heart className="w-4 h-4" />
                  Like ({issueData.likes})
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Follow Updates
                </button>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Issue Reported</p>
                    <p className="text-sm text-gray-500">Jan 15, 2024</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Under Review</p>
                    <p className="text-sm text-gray-500">Jan 16, 2024</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">In Progress</p>
                    <p className="text-sm text-gray-500">Jan 18, 2024</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-400">Resolution</p>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default IssueDetails
