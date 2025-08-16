import React, { useEffect, useState } from "react";
import { Camera, FileText, Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../Config/axios";
import { useSelector } from "react-redux";
import IssueCard from "../../components/IssueCard";


export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [recentIssues, setRecentIssues] = useState([]);
  const [stats, setStats] = useState([]);

  const userDetails = useSelector((state) => state.auth.user);
  console.log(userDetails, "user details in dashboard");

  useEffect(() => {
    getLatestIssues();
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/city/Jamshedpur");
      const dashboardData = response.data;

      const finalStats = [
        {
          label: "Total Issues",
          value: dashboardData.totalIssues || 0,
          trend: "+0%",
          color: "bg-blue-600",
          lightColor: "bg-blue-100",
        },
        {
          label: "In Progress",
          value: dashboardData.inProgressIssues || 0,
          trend: "+0%",
          color: "bg-red-600",
          lightColor: "bg-red-100",
        },
        {
          label: "Resolved",
          value: dashboardData.resolvedIssues || 0,
          trend: "+0%",
          color: "bg-greens-600",
          lightColor: "bg-green-100",
        },
        {
          label: "Pending",
          value: dashboardData.pendingIssues || 0,
          trend: "+0%",
          color: "bg-red-600",
          lightColor: "bg-red-100",
        },
      ];

      setStats(finalStats);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const getLatestIssues = async () => {
    try {
      const response = await axiosInstance.get("/issues/latest/posts");
      const issues = response.data.map((issue) => ({
        ...issue,
        status: issue.status.toLowerCase(),
        priority: issue.priorityLevel?.toLowerCase() || "normal",
        likes: issue.likedBy.length,
        isLiked: issue.likedBy.includes(userDetails.username),
        time: new Date(issue.createdAt).toLocaleString(),
        image: issue.photo,
      }));
      setRecentIssues(issues);
    } catch (error) {
      console.error("Error fetching latest issues:", error);
    }
  };

  const toggleLike = async (issueId) => {
    try {
      const response = await axiosInstance.post(`/issues/${issueId}/like`);
      const updatedIssue = response.data;

      setRecentIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId
            ? {
                ...issue,
                likes: updatedIssue.likedBy.length,
                isLiked: updatedIssue.likedBy.includes(userDetails.username),
              }
            : issue
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const filteredIssues = recentIssues.filter((issue) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      issue.title.toLowerCase().includes(search) ||
      issue.location.toLowerCase().includes(search) ||
      (issue.category || "").toLowerCase().includes(search);
    const matchesFilter = filterStatus === "all" || issue.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const navigate = (path) => {
    window.location.href = path; // Optional: replace with `useNavigate()` from react-router-dom
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.lightColor} rounded-lg flex items-center justify-center`}>
                  <div className={`w-6 h-6 ${stat.color} rounded`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/report-issue"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span className="font-medium">Report New Issue</span>
                </Link>
                {userDetails.role === "CITIZEN" ? (
                  <Link
                    to="/my-reports"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">My Reports</span>
                  </Link>
                ) : (
                  <Link
                    to="/department-issues"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Pending Tasks</span>
                  </Link>
                )}
                <Link
                  to="/all-issues"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">View All Issues</span>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {["Infrastructure", "Utilities", "Environment", "Safety", "Vandalism"].map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Issues</h2>
                    <p className="text-sm text-gray-600 mt-1">Stay updated with the latest community reports</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search issues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Issues Cards */}
              <div className="p-6">
                {filteredIssues.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredIssues.map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        onLike={toggleLike}
                        onNavigate={navigate}
                        userId={userDetails.username}
                        showCategory={true} // Enable category and priority labels
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}