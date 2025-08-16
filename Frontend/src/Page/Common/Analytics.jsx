import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Calendar, Filter, TrendingUp, CheckCircle, Clock, AlertTriangle, Users, MapPin } from 'lucide-react';

const Analytics = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Sample data - in real app, this would come from your API
  const sampleData = {
    monthlyStats: [
      { month: 'Jan', resolved: 145, inProgress: 32, pending: 18, total: 195 },
      { month: 'Feb', resolved: 132, inProgress: 28, pending: 15, total: 175 },
      { month: 'Mar', resolved: 168, inProgress: 35, pending: 22, total: 225 },
      { month: 'Apr', resolved: 159, inProgress: 41, pending: 19, total: 219 },
      { month: 'May', resolved: 183, inProgress: 29, pending: 16, total: 228 },
      { month: 'Jun', resolved: 176, inProgress: 33, pending: 21, total: 230 },
      { month: 'Jul', resolved: 194, inProgress: 38, pending: 17, total: 249 },
      { month: 'Aug', resolved: 187, inProgress: 42, pending: 23, total: 252 },
      { month: 'Sep', resolved: 201, inProgress: 36, pending: 19, total: 256 },
      { month: 'Oct', resolved: 178, inProgress: 31, pending: 15, total: 224 },
      { month: 'Nov', resolved: 165, inProgress: 39, pending: 20, total: 224 },
      { month: 'Dec', resolved: 142, inProgress: 27, pending: 14, total: 183 }
    ],
    priorityData: [
      { name: 'High', value: 387, color: '#ef4444' },
      { name: 'Medium', value: 892, color: '#f59e0b' },
      { name: 'Low', value: 541, color: '#10b981' }
    ],
    departmentStats: [
      { department: 'Water Supply', resolved: 324, pending: 45, avgResolutionTime: 4.2 },
      { department: 'Roads & Transport', resolved: 298, pending: 32, avgResolutionTime: 6.1 },
      { department: 'Sanitation', resolved: 256, pending: 38, avgResolutionTime: 3.8 },
      { department: 'Electricity', resolved: 189, pending: 29, avgResolutionTime: 5.3 },
      { department: 'Public Safety', resolved: 167, pending: 21, avgResolutionTime: 2.9 }
    ],
    resolutionTrends: [
      { period: 'Q1', avgDays: 5.2, issues: 595 },
      { period: 'Q2', avgDays: 4.8, issues: 677 },
      { period: 'Q3', avgDays: 4.3, issues: 757 },
      { period: 'Q4', avgDays: 4.6, issues: 631 }
    ]
  };

  const totalStats = useMemo(() => {
    const total = sampleData.monthlyStats.reduce((acc, month) => ({
      resolved: acc.resolved + month.resolved,
      inProgress: acc.inProgress + month.inProgress,
      pending: acc.pending + month.pending,
      total: acc.total + month.total
    }), { resolved: 0, inProgress: 0, pending: 0, total: 0 });

    const resolutionRate = ((total.resolved / total.total) * 100).toFixed(1);
    return { ...total, resolutionRate };
  }, [sampleData.monthlyStats]);

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-${color}-50 rounded-full`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track and monitor issue resolution performance across departments</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>

            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="water">Water Supply</option>
              <option value="roads">Roads & Transport</option>
              <option value="sanitation">Sanitation</option>
              <option value="electricity">Electricity</option>
              <option value="safety">Public Safety</option>
            </select>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Issues"
            value={totalStats.total.toLocaleString()}
            subtitle="All time"
            icon={AlertTriangle}
            color="blue"
          />
          <StatCard
            title="Resolved Issues"
            value={totalStats.resolved.toLocaleString()}
            subtitle={`${totalStats.resolutionRate}% resolution rate`}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="In Progress"
            value={totalStats.inProgress.toLocaleString()}
            subtitle="Currently active"
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Pending"
            value={totalStats.pending.toLocaleString()}
            subtitle="Awaiting assignment"
            icon={TrendingUp}
            color="red"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Issue Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
                <Line type="monotone" dataKey="inProgress" stroke="#f59e0b" strokeWidth={2} name="In Progress" />
                <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={2} name="Pending" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues by Priority</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sampleData.priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sampleData.priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.departmentStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="department" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                <Bar dataKey="pending" fill="#ef4444" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Time Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Resolution Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.resolutionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [`${value} days`, 'Avg Resolution Time']} />
                <Bar dataKey="avgDays" fill="#3b82f6" name="Average Days" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Details Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Resolution Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleData.departmentStats.map((dept, index) => {
                  const successRate = ((dept.resolved / (dept.resolved + dept.pending)) * 100).toFixed(1);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dept.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {dept.resolved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {dept.pending}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dept.avgResolutionTime} days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          parseFloat(successRate) >= 90 
                            ? 'bg-green-100 text-green-800'
                            : parseFloat(successRate) >= 80
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {successRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;