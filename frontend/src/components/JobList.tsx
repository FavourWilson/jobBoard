/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllJobs } from '../hook/useJobs';

export const JobList = ({ onSelect }: { onSelect: (job: any) => void }) => {
  const { data, isLoading, error } = useAllJobs();

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs</p>;

  return (
    <div>
      <h2>📋 Job Feed</h2>
      {data?.map((job: any, index: number) => (
        <div
          key={index}
          onClick={() => onSelect(job)}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
            cursor: 'pointer',
          }}
        >
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Budget:</strong> {Number(job.budget) / 1e18} ETH</p>
          <p><strong>Status:</strong> {job.isOpen ? 'Open' : 'Closed'}</p>
        </div>
      ))}
    </div>
  );
};
