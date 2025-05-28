import { useWriteContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function useCancelJob() {
  const { writeContract, isPending, isError, isSuccess, error, data } = useWriteContract();

  const cancelJob = (jobId: bigint) => {
    writeContract({
      address: JOB_BOARD_ADDRESS,
      abi: JOB_BOARD_ABI,
      functionName: 'cancelJob',
      args: [jobId],
    });
  };

  return { cancelJob, isPending, isError, isSuccess, error, data };
}
