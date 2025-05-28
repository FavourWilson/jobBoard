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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Apply to Job #{jobId}
      </h2>

      <input
        type="text"
        placeholder="GitHub Profile URL"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Why should they hire you?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleApply}
        disabled={isPending}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          isPending
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isPending ? 'Applying...' : 'Apply'}
      </button>

      {isSuccess && (
        <p className="text-green-600 mt-4 text-center font-medium">
          ✅ Applied Successfully!
        </p>
      )}

      {error && (
        <p className="text-red-600 mt-4 text-center font-medium">
          ❌ {(error as Error).message}
        </p>
      )}
    </div>
  );
};

export default ApplyToJob;
