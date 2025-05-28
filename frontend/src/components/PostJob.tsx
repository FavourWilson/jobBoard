import  { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { JOB_BOARD_ABI, JOB_BOARD_ADDRESS } from '../constants';

const PostJob = () => {
      const [desc, setDesc] = useState('');
  const [budget, setBudget] = useState('');
  const [isPosted, setIsPosted] = useState(false);

  const { writeContractAsync, isPending, error } = useWriteContract();

  const postJob = async () => {
    try {
      await writeContractAsync({
        address: JOB_BOARD_ADDRESS as `0x${string}`,
        abi: JOB_BOARD_ABI,
        functionName: 'postJob',
        args: [desc],
        value: parseEther(budget),
      });
      setIsPosted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <div style={{ padding: 40 }}>
   
         <h1>Post a Job</h1>
         <input
           placeholder="Job description"
           value={desc}
           onChange={(e) => setDesc(e.target.value)}
           style={{ padding: 8, width: '100%', marginBottom: 10 }}
         />
         <input
           placeholder="Budget in ETH"
           value={budget}
           onChange={(e) => setBudget(e.target.value)}
           style={{ padding: 8, width: '100%', marginBottom: 10 }}
         />
   
         <button
           onClick={postJob}
           disabled={isPending}
           style={{ padding: 10, background: '#222', color: '#fff' }}
         >
           {isPending ? 'Posting...' : 'Post Job'}
         </button>
   
         {isPosted && <p>✅ Job Posted!</p>}
         {error && <p style={{ color: 'red' }}>❌ {(error as Error)?.message}</p>}
       </div>
  )
}

export default PostJob
