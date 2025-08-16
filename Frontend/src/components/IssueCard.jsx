import React from "react";
import {
  MapPin,
  User,
  Calendar,
  Heart,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function IssueCard({
  issue,
  onLike,
  onNavigate,
  onStatusChange,
  onStatusSave,
  statusUpdates = {},
  userId,
  viewMode = "grid",
}) {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          dot: "bg-red-400",
          icon: AlertTriangle,
        };
      case "in progress":
      case "in_progress":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-400",
          icon: Clock,
        };
      case "resolved":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          dot: "bg-green-400",
          icon: CheckCircle,
        };
      case "declined":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-300",
          dot: "bg-gray-500",
          icon: AlertTriangle,
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          dot: "bg-gray-400",
          icon: Clock,
        };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return {
          color: "text-red-600",
          bg: "bg-red-100",
          border: "border-red-200",
        };
      case "medium":
        return {
          color: "text-amber-600",
          bg: "bg-amber-100",
          border: "border-amber-200",
        };
      case "low":
        return {
          color: "text-green-600",
          bg: "bg-green-100",
          border: "border-green-200",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-100",
          border: "border-gray-200",
        };
    }
  };

  const statusConfig = getStatusConfig(issue.status);
  const priorityConfig = getPriorityConfig(issue.priority);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
        viewMode === "list" ? "flex flex-col" : ""
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer"
              onClick={() => onNavigate(`/issue/${issue.id}`)}
            >
              {issue.title || "Untitled Issue"}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {issue.description || "No description provided."}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color} ${priorityConfig.border} border`}
            >
              {issue.priority?.charAt(0).toUpperCase() + (issue.priority?.slice(1) || "normal")}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{issue.city || issue.location || "Unknown Location"}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{issue.reportedBy || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onLike(issue.id)}
              className="flex items-center gap-1 text-sm focus:outline-none"
              disabled={!onLike}
            >
              <Heart
                className={`w-4 h-4 ${
                  issue.isLiked || issue.likedBy?.includes(userId)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400"
                }`}
              />
              <span>{issue.likes || issue.likedBy?.length || 0}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}
          >
            <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
            <StatusIcon className="w-4 h-4" />
            {issue.status?.replace(/^\w/, (c) => c.toUpperCase())?.replace("_", " ") || "Unknown"}
          </div>

          {onStatusChange && (
            <div className="flex items-center gap-2">
              <select
                value={statusUpdates[issue.id] || ""}
                onChange={(e) =>
                  onStatusChange(issue.id, e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Update Status</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DECLINED">Declined</option>
                <option value="RESOLVED">Resolved</option>
              </select>

              <button
                onClick={() => onStatusSave(issue.id)}
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
          )}

          <button
            onClick={() => onNavigate(`/issue/${issue.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}