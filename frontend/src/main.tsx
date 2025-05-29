import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';

import ApplyToJobPage from './pages/ApplyToJobPage.tsx';
import PostJobPage from './components/PostJob';
import { AllJobsPage } from './pages/AllJobsPage.tsx';
import ApplicantsPage from './pages/ApplicantsPage.tsx';
import { HireDeveloperPage } from './pages/HireDeveloperPage.tsx';

const chains = [sepolia] as const;

const { connectors } = getDefaultWallets({
  appName: 'Crypto Job Board',
  projectId: 'YOUR_PROJECT_ID',
});

const config = createConfig({
  connectors,
  chains,
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/jobs', element: <AllJobsPage /> },
  { path: '/jobs/:jobId/applicants', element: <ApplicantsPage /> },
  { path: '/post', element: <PostJobPage /> },
  { path: '/apply/:jobId', element: <ApplyToJobPage /> }, 
  { path: '/hire/:jobId', element: <HireDeveloperPage /> }, 
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
