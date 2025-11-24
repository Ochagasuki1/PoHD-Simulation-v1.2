import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, Info } from 'lucide-react';
import { useUpdateApiConnectorAuth } from '../hooks/useQueries';
import type { ApiConnector } from '../backend';

interface UpdateTokenDialogProps {
  connector: ApiConnector;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpdateTokenDialog({ connector, open, onOpenChange }: UpdateTokenDialogProps) {
  const [newToken, setNewToken] = useState('');
  const updateTokenMutation = useUpdateApiConnectorAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await updateTokenMutation.mutateAsync({
      id: connector.id,
      newToken,
    });
    
    handleClose();
  };

  const handleClose = () => {
    setNewToken('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            認証トークンを更新
          </DialogTitle>
          <DialogDescription>
            {connector.id} の認証トークンを更新します
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <div className="space-y-1">
                <p><strong>コネクタID:</strong> {connector.id}</p>
                <p><strong>認証タイプ:</strong> {connector.authType}</p>
                <p><strong>ベースURL:</strong> {connector.baseUrl}</p>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="newToken">新しいアクセストークン *</Label>
            <Input
              id="newToken"
              type="password"
              value={newToken}
              onChange={(e) => setNewToken(e.target.value)}
              placeholder="新しいトークンを入力"
              required
            />
            <p className="text-xs text-muted-foreground">
              {connector.authType === 'OAuth2' 
                ? 'OAuth2フローで取得したアクセストークンを入力してください'
                : 'APIプロバイダーから取得したトークンを入力してください'}
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              キャンセル
            </Button>
            <Button type="submit" disabled={updateTokenMutation.isPending}>
              {updateTokenMutation.isPending ? '更新中...' : '更新'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
