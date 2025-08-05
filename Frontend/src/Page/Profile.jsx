import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Camera,
  Edit3,
  Save,
  X,
  Award,
  TrendingUp,
  Heart,
  MessageCircle,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Nitesh Kumar",
    email: "nitesh@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    joinDate: "January 2024",
    bio: "Community advocate passionate about making our neighborhood a better place to live. I believe in the power of collective action and civic engagement.",
    avatar: "/placeholder.svg?height=120&width=120&text=NK",
  })
  const [editData, setEditData] = useState({ ...profileData })

  const stats = [
    { label: "Issues Reported", value: 12, color: "from-blue-500 to-indigo-600", icon: TrendingUp },
    { label: "Issues Resolved", value: 8, color: "from-emerald-500 to-green-600", icon: Award },
    { label: "Community Impact", value: 156, color: "from-purple-500 to-pink-600", icon: Heart },
    { label: "Likes Received", value: 89, color: "from-orange-500 to-red-600", icon: MessageCircle },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Reported",
      issue: "Pothole on Main Street",
      date: "2 days ago",
      status: "in-progress",
    },
    {
      id: 2,
      action: "Liked",
      issue: "Broken Street Light",
      date: "3 days ago",
      status: "resolved",
    },
    {
      id: 3,
      action: "Commented on",
      issue: "Illegal Waste Dumping",
      date: "1 week ago",
      status: "pending",
    },
  ]

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your account and track your community contributions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="xl:col-span-2 space-y-8"
          >
            {/* Basic Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 font-semibold"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 text-emerald-600 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-200 font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl hover:from-gray-100 hover:to-slate-100 transition-all duration-200 font-semibold"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src={profileData.avatar || "/placeholder.svg"}
                      alt="Profile"
                      width={160}
                      height={160}
                      className="w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-xl group-hover:shadow-2xl transition-shadow"
                    />
                    {isEditing && (
                      <button className="absolute bottom-3 right-3 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                        <Camera className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
                    <p className="text-gray-600 font-medium">Community Member</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[
                      { icon: User, label: "Full Name", field: "name", type: "text" },
                      { icon: Mail, label: "Email Address", field: "email", type: "email" },
                      { icon: Phone, label: "Phone Number", field: "phone", type: "tel" },
                      { icon: MapPin, label: "Location", field: "location", type: "text" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          {item.icon && <item.icon className="w-4 h-4 text-blue-500" />}
                          {item.label}
                        </label>
                        {isEditing ? (
                          <input
                            type={item.type}
                            value={editData[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-gray-50/50 rounded-xl text-gray-900 font-medium">
                            {profileData[item.field]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <User className="w-4 h-4 text-blue-500" />
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50/50 rounded-xl text-gray-900 leading-relaxed">
                        {profileData.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold text-lg">
                        {activity.action} <span className="text-blue-600">"{activity.issue}"</span>
                      </p>
                      <p className="text-sm text-gray-500 font-medium">{activity.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.status === "resolved"
                          ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200"
                          : activity.status === "in-progress"
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                            : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {activity.status.replace("-", " ")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Your Impact</h3>
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                    ></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Account Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Member since</p>
                    <p className="font-bold text-gray-900">{profileData.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <Settings className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Account Status</p>
                    <p className="font-bold text-emerald-600">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 px-6 py-4 text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 font-semibold group">
                  <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Account Settings
                </button>
                <button className="w-full flex items-center gap-3 px-6 py-4 text-gray-600 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl hover:from-gray-100 hover:to-slate-100 transition-all duration-200 font-semibold group">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Privacy Settings
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
