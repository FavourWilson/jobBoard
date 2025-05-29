/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/ApplicantsPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGetApplicants } from '../hook/useGetApplicants';

const ApplicantsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const parsedJobId = jobId ? parseInt(jobId, 10) : undefined;

  const { data: applicants, isLoading, error } = useGetApplicants(parsedJobId);

  if (!parsedJobId) return <p className="text-red-600 text-center mt-8">❌ Invalid job ID</p>;
  if (isLoading) return <p className="text-center text-gray-600 mt-8">Loading applicants…</p>;
  if (error) return <p className="text-center text-red-600 mt-8">❌ Failed to load applicants: {(error as Error).message}</p>;
  if (!applicants || applicants.length === 0)
    return <p className="text-center text-gray-600 mt-8">No applicants found for job #{jobId}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Job
      </button>

      <h2 className="text-3xl font-bold mb-6">Applicants for Job #{jobId}</h2>

      <div className="grid gap-6">
        {applicants.map((applicant: any, index: number) => (
          <div
            onClick={() => navigate(`/hire/${parsedJobId}?developer=${applicant.developer}`)}
            key={index}
            className="bg-white p-6 rounded-xl shadow border border-gray-200"
          >
            <p className="mb-2">
              <span className="font-semibold text-gray-600">👤 Developer:</span>{' '}
              <span className="break-all">{applicant.developer}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-600">🔗 GitHub:</span>{' '}
              <a
                href={applicant.github}
                className="text-blue-600 hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {applicant.github}
              </a>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-600">💬 Pitch:</span>{' '}
              {applicant.pitch}
            </p>
            <p>
              <span className="font-semibold text-gray-600">📌 Hired:</span>{' '}
              <span
                className={`ml-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  applicant.hired
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {applicant.hired ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsPage;
