import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSetDaoInfo } from '../hooks/useQueries';
import type { DaoInfo } from '../backend';
import { Loader2 } from 'lucide-react';

interface DaoSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDaoInfo: DaoInfo | null | undefined;
}

export default function DaoSettingsDialog({ open, onOpenChange, currentDaoInfo }: DaoSettingsDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [settings, setSettings] = useState('');
  const setDaoInfoMutation = useSetDaoInfo();

  useEffect(() => {
    if (currentDaoInfo) {
      setName(currentDaoInfo.name);
      setDescription(currentDaoInfo.description);
      setSettings(currentDaoInfo.settings);
    }
  }, [currentDaoInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    await setDaoInfoMutation.mutateAsync({
      name: name.trim(),
      description: description.trim(),
      settings: settings.trim(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>DAO設定</DialogTitle>
          <DialogDescription>
            DAOの基本情報を設定します。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dao-name">DAO名 *</Label>
            <Input
              id="dao-name"
              placeholder="例: TikTok Creators DAO"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={setDaoInfoMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dao-description">説明 *</Label>
            <Textarea
              id="dao-description"
              placeholder="DAOの目的や活動内容を記述してください"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={setDaoInfoMutation.isPending}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dao-settings">追加設定（オプション）</Label>
            <Textarea
              id="dao-settings"
              placeholder="その他の設定情報（JSON形式など）"
              value={settings}
              onChange={(e) => setSettings(e.target.value)}
              disabled={setDaoInfoMutation.isPending}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={setDaoInfoMutation.isPending}
            >
              キャンセル
            </Button>
            <Button 
              type="submit"
              disabled={!name.trim() || !description.trim() || setDaoInfoMutation.isPending}
            >
              {setDaoInfoMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                '保存'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
