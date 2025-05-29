import { useSearchParams, useParams } from 'react-router';
import { useWriteContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function HireDeveloperPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [searchParams] = useSearchParams();
  const developer = searchParams.get('developer') || '';

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleHire = () => {
    if (!jobId || !developer) return;
    writeContract({
      address: JOB_BOARD_ADDRESS,
      abi: JOB_BOARD_ABI,
      functionName: 'hireDeveloperByAddress',
      args: [BigInt(jobId), developer],
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Hire Developer</h2>
      <p className="mb-4 text-gray-600 break-all">
        <strong>Job ID:</strong> {jobId} <br />
        <strong>Developer:</strong> {developer}
      </p>
      <button
        onClick={handleHire}
        disabled={isPending}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Hiring...' : 'Hire'}
      </button>
      {isSuccess && (
        <p className="text-green-600 mt-3">✅ Developer hired successfully!</p>
      )}
    </div>
  );
}
