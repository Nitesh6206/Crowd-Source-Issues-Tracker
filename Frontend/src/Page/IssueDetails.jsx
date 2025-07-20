import { useParams } from 'react-router-dom';

const IssueDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Issue Details (ID: {id})</h2>
        <p><strong>Title:</strong> Large Pothole on Main Street</p>
        <p><strong>Description:</strong> Deep pothole causing damage near the intersection</p>
        <p><strong>Status:</strong> In Progress</p>
        <p><strong>Location:</strong> Main St & 5th Ave, Downtown</p>
        <p><strong>Reported by:</strong> John Doe</p>
        <p><strong>Date:</strong> 2024-01-15</p>
        <p><strong>Likes:</strong> 23</p>
        <p><strong>Category:</strong> Roads</p>
        <div className="mt-4">
          <img src="https://via.placeholder.com/400x200" alt="Issue visual" className="rounded" />
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
