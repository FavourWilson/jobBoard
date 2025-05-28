/* eslint-disable @typescript-eslint/no-explicit-any */
// hook/useJobs.ts
import { useReadContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';
import type { Job } from '../types';

export function useAllJobs() {
  return useReadContract({
    address: JOB_BOARD_ADDRESS as `0x${string}`,
    abi: JOB_BOARD_ABI,
    functionName: 'getAllJobs',
  }) as {
    data: Job[] | undefined;
    isLoading: boolean;
    error: any;
  };
}
