import GlobalErrorBoundary from './components/common/GlobalErrorBoundary.tsx';
import Router from './routes/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster
          containerStyle={{
            bottom: '7rem',
          }}
        />
        <Router />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
