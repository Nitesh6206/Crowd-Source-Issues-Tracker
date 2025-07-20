import React from 'react';

const ReportNewIssue = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Report a Public Issue</h2>
        <p className="text-sm text-gray-500 mb-6">
          Help improve your community by reporting issues that need attention
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Issue Title *</label>
            <input type="text" required className="w-full border p-2 rounded" placeholder="Brief description of the issue" />
          </div>


          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Location *</label>
              <input type="text" required className="w-full border p-2 rounded" placeholder="Enter address or landmark" />
            </div>
            <button type="button" className="bg-gray-200 px-4 py-2 rounded">📍 Detect</button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Detailed Description *</label>
            <textarea required className="w-full border p-2 rounded" rows={4} placeholder="More details about the issue..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City *</label>
            <input type="text" required className="w-full border p-2 rounded" placeholder="Enter city" />
          </div>

          <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded">
            <p className="text-sm text-gray-500 mb-2">Upload photos of the issue (PNG, JPG up to 10MB each)</p>
            <input type="file" multiple />
          </div>

          <div className="flex justify-between">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => window.history.back()}>Cancel</button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportNewIssue;
