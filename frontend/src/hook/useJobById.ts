import { useReadContract } from "wagmi";
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function useJobById(jobId: number | undefined) {
  return useReadContract({
    abi: JOB_BOARD_ABI,
    address: JOB_BOARD_ADDRESS,
    functionName: 'jobs',
    args: jobId !== undefined ? [jobId] : undefined,
  });
}