import { useWriteContract ,  useReadContract } from "wagmi";
import { JOB_BOARD_ADDRESS, JOB_BOARD_ABI } from "../constants";
import { parseEther } from "viem";

export function usePostJob() {
  const { writeContract, data, isPending, isSuccess, error } = useWriteContract();

  const postJob = (description: string, budgetInEth: string) => {
    writeContract({
      address: JOB_BOARD_ADDRESS as `0x${string}`,
      abi: JOB_BOARD_ABI,
      functionName: 'postJob',
      args: [description],
      value: parseEther(budgetInEth),
    });
  };

  return { postJob, data, isPending, isSuccess, error };
}

export function useJob(index: number) {
  return useReadContract({
    address: JOB_BOARD_ADDRESS as `0x${string}`,
    abi: JOB_BOARD_ABI,
    functionName: 'jobs',
    args: [BigInt(index)],
  });
}
