import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import SimulationDashboard from './pages/SimulationDashboard';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background">
        <SimulationDashboard />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
