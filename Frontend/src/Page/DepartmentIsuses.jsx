import { use, useEffect, useState } from "react";
import {
  Search,
  MapPin,
  User,
  Calendar,
  Heart,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle,
  Grid3X3,
  List,
  RefreshCw
} from "lucide-react";
import axiosInstance from "../Config/axios";
import { useSelector } from "react-redux";

export default function DepartmentIssues() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({}); // temporary status storage

  // Mock navigation function - replace with your actual navigation
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };
  const userDetails = useSelector((state) => state.auth.user);
  console.log(userDetails.auth.city, "user details in department issues");

  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-400", icon: AlertTriangle };
      case "IN_PROGRESS":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-400", icon: Clock };
      case "RESOLVED":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-400", icon: CheckCircle };
      case "DECLINED":
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", dot: "bg-gray-500", icon: AlertTriangle };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-400", icon: Clock };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return { color: "text-red-600", bg: "bg-red-100", border: "border-red-200" };
      case "medium": return { color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" };
      case "low": return { color: "text-green-600", bg: "bg-green-100", border: "border-green-200" };
      default: return { color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-200" };
    }
  };

  const fetchAllIssues = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/issues/public/city/${userDetails.auth.city}`);
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(`/dashboard/city/${userDetails.auth.city}`);
      const dashboardData = response.data;

      const finalStats = [
        { label: "Total Issues", value: dashboardData.totalIssues || 0, trend: "+0%", color: "bg-blue-600", lightColor: "bg-blue-100" },
        { label: "Resolved", value: dashboardData.resolvedIssues || 0, trend: "+0%", color: "bg-green-600", lightColor: "bg-green-100" },
        { label: "Pending", value: dashboardData.pendingIssues || 0, trend: "+0%", color: "bg-red-600", lightColor: "bg-red-100" },
        { label: "Top Liked", value: dashboardData.topLikedIssues?.length || 0, trend: "+0%", color: "bg-purple-600", lightColor: "bg-purple-100" }
      ];

      setStats(finalStats);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchAllIssues();
    fetchDashboardData();
  }, []);

  const refreshData = () => {
    fetchAllIssues();
    fetchDashboardData();
  };

  // ✅ Professional handler for updating issue status
  const handleStatusSave = async (issueId) => {
    const newStatus = statusUpdates[issueId];
    if (!newStatus) return;

    try {
      await axiosInstance.put(`/issues/${issueId}/update-status`, { status: newStatus });
      console.log(`Issue ${issueId} updated to ${newStatus}`);
      refreshData();
      setStatusUpdates((prev) => ({ ...prev, [issueId]: "" })); // reset selection
    } catch (error) {
      console.error("Failed to update issue status", error);
    }
  };

  const filteredAndSortedIssues = issues
    .filter((issue) => {
      const title = issue.title || "";
      const location = issue.city || "";
      const status = issue.status?.toLowerCase() || "";

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || status === selectedFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "newest": comparison = new Date(b.createdAt) - new Date(a.createdAt); break;
        case "oldest": comparison = new Date(a.createdAt) - new Date(b.createdAt); break;
        case "likes": comparison = (b.likedBy?.length || 0) - (a.likedBy?.length || 0); break;
        case "title": comparison = a.title.localeCompare(b.title); break;
        default: comparison = 0;
      }
      return sortOrder === "desc" ? comparison : -comparison;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading community issues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Issues</h1>
              <p className="text-gray-600">Track and engage with issues that matter to your community</p>
            </div>
            <button
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

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
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="declined">Declined</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="likes">Most Liked</option>
                <option value="title">Alphabetical</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"} rounded-l-lg transition-colors`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"} rounded-r-lg transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Grid/List */}
        {filteredAndSortedIssues.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Issues Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
            {filteredAndSortedIssues.map((issue) => {
              const statusConfig = getStatusConfig(issue.status);
              const priorityConfig = getPriorityConfig(issue.priority);

              return (
                <div key={issue.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{issue.title || "Untitled Issue"}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{issue.description || "No description provided."}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color} ${priorityConfig.border} border`}>
                          {issue.priority?.charAt(0).toUpperCase() + issue.priority?.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{issue.city}</span></div>
                      <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{issue.reportedBy}</span></div>
                      <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{new Date(issue.createdAt).toLocaleDateString()}</span></div>
                      <div className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-500" /><span>{issue.likedBy?.length || 0}</span></div>
                    </div>

                    {/* Footer with Status Update */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                        {issue.status?.replace(/^\w/, (c) => c.toUpperCase())}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={statusUpdates[issue.id] || ""}
                          onChange={(e) =>
                            setStatusUpdates((prev) => ({ ...prev, [issue.id]: e.target.value }))
                          }
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Update Status</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DECLINED">Declined</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>

                        <button
                          onClick={() => handleStatusSave(issue.id)}
                          disabled={!statusUpdates[issue.id]}
                          className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            statusUpdates[issue.id]
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Save
                        </button>
                      </div>

                      <button
                        onClick={() => navigate(`/issue/${issue.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
