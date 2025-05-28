import { useParams } from 'react-router';
import { useWriteContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function CancelJobPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleCancel = () => {
    writeContract({
      address: JOB_BOARD_ADDRESS,
      abi: JOB_BOARD_ABI,
      functionName: 'cancelJob',
      args: [BigInt(jobId || 0)],
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cancel Job #{jobId}</h2>
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        {isPending ? 'Cancelling...' : 'Cancel Job'}
      </button>
      {isSuccess && <p className="text-green-600 mt-2">Job cancelled successfully!</p>}
    </div>
  );
}
