import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddEngine } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';

interface AddEngineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddEngineDialog({ open, onOpenChange }: AddEngineDialogProps) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [settings, setSettings] = useState('');
  const addEngineMutation = useAddEngine();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !name.trim() || !description.trim()) return;

    await addEngineMutation.mutateAsync({
      id: id.trim(),
      name: name.trim(),
      description: description.trim(),
      settings: settings.trim(),
    });
    
    // Reset form
    setId('');
    setName('');
    setDescription('');
    setSettings('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>エンジン追加</DialogTitle>
          <DialogDescription>
            新しいDAOエンジンを登録します。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="engine-id">エンジンID *</Label>
            <Input
              id="engine-id"
              placeholder="例: tiktok-engine-v1"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={addEngineMutation.isPending}
            />
            <p className="text-xs text-muted-foreground">
              一意の識別子（英数字とハイフン）
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="engine-name">エンジン名 *</Label>
            <Input
              id="engine-name"
              placeholder="例: TikTok Community Engine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={addEngineMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="engine-description">説明 *</Label>
            <Textarea
              id="engine-description"
              placeholder="エンジンの機能や対象コミュニティを記述してください"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={addEngineMutation.isPending}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="engine-settings">エンジン設定（オプション）</Label>
            <Textarea
              id="engine-settings"
              placeholder="エンジン固有の設定情報（JSON形式など）"
              value={settings}
              onChange={(e) => setSettings(e.target.value)}
              disabled={addEngineMutation.isPending}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={addEngineMutation.isPending}
            >
              キャンセル
            </Button>
            <Button 
              type="submit"
              disabled={!id.trim() || !name.trim() || !description.trim() || addEngineMutation.isPending}
            >
              {addEngineMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  追加中...
                </>
              ) : (
                '追加'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
