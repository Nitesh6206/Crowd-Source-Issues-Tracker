import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h1 className="text-2xl font-bold">Welcome, Nitesh! 👋</h1>
        <p className="text-gray-600">Here’s what’s happening in your area today.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <button
            className="w-full bg-black text-white py-2 rounded mb-2"
            onClick={() => navigate('/reportIssue')}
          >
            📸 Report New Issue
          </button>
          <button className="w-full border border-gray-300 py-2 rounded">
            📍 My Reports
          </button>
        </div>

        {/* Stats Overview */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-blue-100 text-blue-800 py-2 rounded">
              <p className="text-xl font-bold">12</p>
              <p className="text-sm">New</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 py-2 rounded">
              <p className="text-xl font-bold">8</p>
              <p className="text-sm">In Progress</p>
            </div>
            <div className="bg-green-100 text-green-800 py-2 rounded">
              <p className="text-xl font-bold">30</p>
              <p className="text-sm">Resolved</p>
            </div>
          </div>
        </div>

        {/* Recent Issues */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Issues</h3>
          {[
            {
              title: 'Pothole on Main Street',
              location: 'Downtown, Main St & 5th Ave',
              status: 'pending',
              likes: 23,
              time: '2 hours ago',
            },
            {
              title: 'Broken Street Light',
              location: 'Park Avenue, Block 12',
              status: 'in-progress',
              likes: 15,
              time: '5 hours ago',
            },
            {
              title: 'Illegal Waste Dumping',
              location: 'Industrial Area, Sector 7',
              status: 'resolved',
              likes: 31,
              time: '1 day ago',
            },
          ].map((issue, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold">{issue.title}</p>
              <p className="text-sm text-gray-500">{issue.location}</p>
              <div className="flex items-center text-sm mt-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-white text-xs mr-2
                    ${
                      issue.status === 'pending'
                        ? 'bg-yellow-500'
                        : issue.status === 'in-progress'
                        ? 'bg-blue-500'
                        : 'bg-green-600'
                    }`}
                >
                  {issue.status}
                </span>
                <span className="text-gray-500">
                  {issue.likes} likes • {issue.time}
                </span>
              </div>
            </div>
          ))}
          <button
            className="mt-2 w-full text-center text-blue-500 hover:underline"
            onClick={() => navigate('/AllIssues')}
          >
            View All Issues
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
