// hooks/useApplyToJob.ts
import { useWriteContract } from 'wagmi';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

export function useApplyToJob() {
  const { writeContractAsync, isPending, error, isSuccess } = useWriteContract();

  const applyToJob = async (jobId: number, github: string, pitch: string) => {
    await writeContractAsync({
      address: JOB_BOARD_ADDRESS as `0x${string}`,
      abi: JOB_BOARD_ABI,
      functionName: 'applyToJob',
      args: [BigInt(jobId), github, pitch],
    });
  };

  return { applyToJob, isPending, error, isSuccess };
}
