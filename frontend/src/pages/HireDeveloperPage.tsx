import { useState } from 'react';
import { useParams } from 'react-router';
import { useWriteContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function HireDeveloperPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [applicantIndex, setApplicantIndex] = useState('');
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleHire = () => {
    writeContract({
      address: JOB_BOARD_ADDRESS,
      abi: JOB_BOARD_ABI,
      functionName: 'hireDeveloper',
      args: [BigInt(jobId || 0), BigInt(applicantIndex)],
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hire Developer for Job #{jobId}</h2>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Applicant Index"
        value={applicantIndex}
        onChange={(e) => setApplicantIndex(e.target.value)}
      />
      <button
        onClick={handleHire}
        disabled={isPending}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Hiring...' : 'Hire'}
      </button>
      {isSuccess && <p className="text-green-600 mt-2">Developer hired successfully!</p>}
    </div>
  );
}
