import { Link } from 'react-router-dom';

const dummyIssues = [
  {
    id: 12847,
    title: 'Large Pothole on Main Street',
    desc: 'Deep pothole causing damage to vehicles near the intersection',
    status: 'in progress',
    location: 'Main St & 5th Ave, Downtown',
    author: 'John Doe',
    date: '2024-01-15',
    likes: 23,
    category: 'Roads',
    trending: true,
  },
  {
    id: 12846,
    title: 'Broken Street Light',
    desc: 'Street light has been out for over a week...',
    status: 'pending',
    location: 'Park Avenue, Block 12',
    author: 'Sarah Wilson',
    date: '2024-01-14',
    likes: 15,
    category: 'Lighting',
    trending: false,
  },
];

const AllIssues = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">All Community Issues</h2>
        <p className="text-gray-500">Showing {dummyIssues.length} issues</p>
      </div>

      {dummyIssues.map((issue) => (
        <div key={issue.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{issue.title}
                {issue.trending && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">🔥 Trending</span>}
              </h3>
              <p className="text-sm text-gray-600">{issue.desc}</p>
              <div className="text-xs text-gray-500 mt-1">
                📍 {issue.location} • 👤 {issue.author} • 📅 {issue.date} • ❤️ {issue.likes} likes
              </div>
              <div className="mt-1 text-sm font-medium">
                🏷️ {issue.category} • ID: {issue.id}
              </div>
            </div>
            <div className="text-right space-y-2">
              <span className={`text-xs px-2 py-1 rounded-full bg-gray-200`}>{issue.status}</span>
              <div>
                <Link to={`/issue/${issue.id}`}>
                  <button className="bg-black text-white px-3 py-1 rounded text-sm">View Details</button>
                </Link>
                <button className="ml-2 text-sm">🤍 Like</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllIssues;
