import React, { useState } from 'react';
import { useApplyToJob } from '../hook/useApplyToJob';

type Props = {
  jobId: number;
};

const ApplyToJob: React.FC<Props> = ({ jobId }) => {
  const [github, setGithub] = useState('');
  const [description, setDescription] = useState('');
  const { applyToJob, isPending, isSuccess, error } = useApplyToJob();

  const handleApply = async () => {
    try {
      await applyToJob(jobId, github, description);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Apply to Job #{jobId}</h2>

      <input
        placeholder="GitHub Profile URL"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        style={{ padding: 8, width: '100%', marginBottom: 10 }}
      />
      <textarea
        placeholder="Why should they hire you?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: 8, width: '100%', marginBottom: 10 }}
      />

      <button
        onClick={handleApply}
        disabled={isPending}
        style={{ padding: 10, background: '#0070f3', color: '#fff' }}
      >
        {isPending ? 'Applying...' : 'Apply'}
      </button>

      {isSuccess && <p>✅ Applied Successfully!</p>}
      {error && <p style={{ color: 'red' }}>❌ {(error as Error).message}</p>}
    </div>
  );
};

export default ApplyToJob;
