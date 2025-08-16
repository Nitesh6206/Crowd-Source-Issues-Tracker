import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Upload,
  ArrowLeft,
  AlertCircle,
  FileText,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Config/axios";

export default function ReportNewIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    city: "",
    category: "",
    priority: "medium",
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Roads & Infrastructure",
    "Street Lighting",
    "Waste Management",
    "Water & Drainage",
    "Public Safety",
    "Parks & Recreation",
    "Traffic & Transportation",
    "Other",
  ];

  const priorities = [
    {
      value: "low",
      label: "Low Priority",
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "medium",
      label: "Medium Priority",
      color: "from-amber-500 to-orange-500",
    },
    {
      value: "high",
      label: "High Priority",
      color: "from-red-500 to-pink-500",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await axiosInstance.post("/issues", formData)
    console.log(response.data)
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  // ✅ Location detection + reverse geocoding
  const detectLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            if (data && data.display_name) {
              setFormData((prev) => ({
                ...prev,
                location: data.display_name,
                city:
                  data.address?.city ||
                  data.address?.town ||
                  data.address?.village ||
                  "",
              }));
            } else {
              alert("Unable to retrieve address. Please try again.");
            }
          } catch (error) {
            console.error("Reverse geocoding error:", error);
            alert("Failed to fetch location. Please try again later.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to detect location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl mb-6 shadow-xl">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-900 to-pink-900 bg-clip-text text-transparent mb-4">
              Report a Public Issue
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help improve your community by reporting issues that need
              attention from local authorities
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Issue Title */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Issue Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Brief description of the issue"
                className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-lg"
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          priority: priority.value,
                        }))
                      }
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        formData.priority === priority.value
                          ? `bg-gradient-to-r ${priority.color} text-white shadow-lg`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {priority.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Location
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter address or landmark"
                  className="flex-1 px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-lg"
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-2 border-blue-200 rounded-2xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  Detect
                </button>
              </div>
            </div>

            {/* City */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="Enter city"
                className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 text-lg"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Detailed Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Provide more details about the issue, its impact, and any relevant information..."
                className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 resize-none text-lg"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg font-bold text-gray-700">
                <Camera className="w-5 h-5 text-blue-500" />
                Upload Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors bg-gradient-to-br from-gray-50 to-white">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl text-gray-700 font-semibold mb-2">
                      Upload photos of the issue
                    </p>
                    <p className="text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 cursor-pointer font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    <Camera className="w-5 h-5" />
                    Choose Files
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 text-left">
                    <p className="text-lg font-semibold text-gray-700 mb-3">
                      Selected files:
                    </p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <p key={index} className="text-gray-600 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {file.name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-8 py-4 text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold text-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed transform-none"
                    : "hover:from-blue-600 hover:to-indigo-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Report...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5" />
                    Submit Report
                  </div>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
