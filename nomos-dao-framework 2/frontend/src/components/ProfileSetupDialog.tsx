import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { UserRole } from '../backend';
import { Loader2 } from 'lucide-react';

interface ProfileSetupDialogProps {
  open: boolean;
}

export default function ProfileSetupDialog({ open }: ProfileSetupDialogProps) {
  const [name, setName] = useState('');
  const saveProfileMutation = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await saveProfileMutation.mutateAsync({
      name: name.trim(),
      role: UserRole.user,
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>プロファイル設定</DialogTitle>
          <DialogDescription>
            Nomos DAO Frameworkへようこそ！まずはあなたの名前を教えてください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              placeholder="山田太郎"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saveProfileMutation.isPending}
              autoFocus
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={!name.trim() || saveProfileMutation.isPending}
          >
            {saveProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              '保存して続ける'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
