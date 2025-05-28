import { useWriteContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function useHireDeveloper() {
  const { writeContract, isPending, isSuccess, isError, error, data } = useWriteContract();

  const hireDeveloper = (jobId: bigint, applicantIndex: bigint) => {
    writeContract({
      address: JOB_BOARD_ADDRESS,
      abi: JOB_BOARD_ABI,
      functionName: 'hireDeveloper',
      args: [jobId, applicantIndex],
    });
  };

  return {
    hireDeveloper,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  };
}
