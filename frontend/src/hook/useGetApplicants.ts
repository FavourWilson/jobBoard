/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReadContract } from "wagmi";
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';
import type { Applicant } from "../types";


export function useGetApplicants(jobId: number | undefined) {
  return useReadContract({
    abi: JOB_BOARD_ABI,
    address: JOB_BOARD_ADDRESS,
    functionName: 'getApplicants',
    args: jobId !== undefined ? [jobId] : undefined,
  }) as {
    data: Applicant[] | undefined;
    isLoading: boolean;
    error: any;
  };;
}