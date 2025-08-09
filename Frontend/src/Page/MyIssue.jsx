import { useEffect, useState } from "react";
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
} from "lucide-react";
import axiosInstance from "../Config/axios";

export default function MyIssue() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState([])

  // Mock navigation function - replace with your actual navigation
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };


  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          dot: "bg-red-400",
          icon: AlertTriangle
        };
      case "in progress":
        return {
          bg: "bg-amber-50", 
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-400",
          icon: Clock
        };
      case "resolved":
        return {
          bg: "bg-green-50",
          text: "text-green-700", 
          border: "border-green-200",
          dot: "bg-green-400",
          icon: CheckCircle
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200", 
          dot: "bg-gray-400",
          icon: Clock
        };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return { color: "text-red-600", bg: "bg-red-100", border: "border-red-200" };
      case "medium": 
        return { color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" };
      case "low":
        return { color: "text-green-600", bg: "bg-green-100", border: "border-green-200" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-200" };
    }
  };

  const fetchMyIssues = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/issues/my-issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchMyIssues();
  }, []);

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
        case "newest":
          comparison = new Date(b.createdAt) - new Date(a.createdAt);
          break;
        case "oldest":
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case "likes":
          comparison = (b.likedBy?.length || 0) - (a.likedBy?.length || 0);
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === "desc" ? comparison : -comparison;
    });

  const refreshData = () => {
    fetchMyIssues();
  };

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

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search */}
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

            {/* Filters */}
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

              {/* View Mode Toggle */}
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

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedIssues.length} of {issues.length} issues
          </p>
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
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={issue.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    
                    {/* Issue Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {issue.title || "Untitled Issue"}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {issue.description || "No description provided."}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color} ${priorityConfig.border} border`}>
                          {issue.priority?.charAt(0).toUpperCase() + issue.priority?.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Issue Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{issue.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{issue.reportedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{issue.likedBy?.length || 0}</span>
                      </div>
                    </div>

                    {/* Issue Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                        {issue.status?.replace(/^\w/, c => c.toUpperCase())}
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