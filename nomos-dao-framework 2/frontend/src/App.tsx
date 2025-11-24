import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProfileSetupDialog from './components/ProfileSetupDialog';
import { Loader2 } from 'lucide-react';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;
  const showContent = !isInitializing && (!isAuthenticated || (isAuthenticated && userProfile !== null));

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Landing />
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    );
  }

  if (showProfileSetup) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ProfileSetupDialog open={true} />
        <Toaster />
      </ThemeProvider>
    );
  }

  if (!showContent) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
