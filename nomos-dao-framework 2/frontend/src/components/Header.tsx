import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, LogIn } from 'lucide-react';
import { useGetCallerUserProfile } from '../hooks/useQueries';

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/nomos-logo-transparent.dim_200x200.png" alt="Nomos Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nomos DAO Framework
            </h1>
            <p className="text-xs text-muted-foreground">モジュラー型DAOフレームワーク</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && userProfile && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-foreground font-medium">{userProfile.name}</span>
            </div>
          )}
          
          <Button
            onClick={handleAuth}
            disabled={disabled}
            variant={isAuthenticated ? 'outline' : 'default'}
            className="gap-2"
          >
            {disabled ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                ログイン中...
              </>
            ) : isAuthenticated ? (
              <>
                <LogOut className="h-4 w-4" />
                ログアウト
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                ログイン
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
