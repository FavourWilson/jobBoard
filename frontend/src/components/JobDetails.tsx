/* eslint-disable @typescript-eslint/no-explicit-any */
// components/JobDetails.tsx
import  { useState } from 'react';
import { useApplyToJob } from '../hook/useApplyToJob';

export const JobDetails = ({ job, onBack }: { job: any; onBack: () => void }) => {
  const [github, setGithub] = useState('');
  const [pitch, setPitch] = useState('');

  const { applyToJob, isPending, isSuccess, error } = useApplyToJob();

  const handleApply = () => {
    applyToJob(job.id, github, pitch);
  };

  return (
    <div>
      <button onClick={onBack}>⬅ Back</button>
      <h2>💼 Job Details</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Budget:</strong> {Number(job.budget) / 1e18} ETH</p>
      <p><strong>Client:</strong> {job.client}</p>
      <p><strong>Status:</strong> {job.isOpen ? 'Open' : 'Closed'}</p>

      {job.isOpen && (
        <>
          <h3>Apply to this job</h3>
          <input
            placeholder="GitHub Link"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <textarea
            placeholder="Pitch"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            rows={3}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <button onClick={handleApply} disabled={isPending}>
            {isPending ? 'Applying...' : 'Apply'}
          </button>
          {isSuccess && <p>✅ Application Submitted!</p>}
          {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
        </>
      )}
    </div>
  );
};
