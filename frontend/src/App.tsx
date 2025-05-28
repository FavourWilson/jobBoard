/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { JobList } from './components/JobList';
import { JobDetails } from './components/JobDetails';

const App = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🧑‍💻 Blockchain Job Board</h1>
          <ConnectButton />
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          {selectedJob ? (
            <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
          ) : (
            <JobList onSelect={(job) => setSelectedJob(job)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
