import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function AccessDeniedScreen() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center space-y-6 p-8">
        <div className="mx-auto h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">アクセスが拒否されました</h1>
          <p className="text-muted-foreground">
            このアプリケーションにアクセスする権限がありません。
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          ログアウト
        </Button>
      </div>
    </div>
  );
}
