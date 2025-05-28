import { useReadContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function useGetAllJobs() {
  return useReadContract({
    abi: JOB_BOARD_ABI,
    address: JOB_BOARD_ADDRESS,
    functionName: 'getAllJobs',
  });
}
