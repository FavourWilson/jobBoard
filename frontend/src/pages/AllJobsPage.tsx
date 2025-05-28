/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/AllJobsPage.tsx
import { useAllJobs } from '../hook/useJobs';
import { useNavigate } from 'react-router';

export function AllJobsPage() {
  const { data: jobs, isLoading, error } = useAllJobs();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center text-gray-600 mt-8">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">Error: {error.message || 'Failed to load jobs'}</p>;
  if (!jobs || jobs.length === 0) return <p className="text-center text-gray-600 mt-8">No jobs available.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">💼 Open Blockchain Jobs</h1>

      <div className="grid gap-6">
        {jobs.map((job: any) => (
          <div
            key={job.id}
            onClick={() => navigate(`/apply/${job.id}`)}
            className="cursor-pointer bg-white shadow border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{job.description}</h2>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>💰 Budget:</strong> {job.budget} wei</p>
              <p>
                <strong>📌 Status:</strong>{' '}
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    job.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {job.isOpen ? 'Open' : 'Closed'}
                </span>
              </p>
              <p><strong>👤 Client:</strong> {job.client}</p>
              {job.developer && <p><strong>👨‍💻 Developer:</strong> {job.developer}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
