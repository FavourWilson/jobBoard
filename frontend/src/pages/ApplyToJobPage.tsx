import { useParams } from 'react-router';
import ApplyToJob from '../components/ApplyToJob';

const ApplyToJobPage = () => {
  const { jobId } = useParams();

  if (!jobId) return <p>Invalid job</p>;

  return <ApplyToJob jobId={Number(jobId)} />;
};

export default ApplyToJobPage;
