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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Info } from 'lucide-react';
import { useAddApiConnector, useGetTikTokConnectorTemplate } from '../hooks/useQueries';
import type { ApiConnector } from '../backend';

interface AddApiConnectorDialogProps {
  engineId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddApiConnectorDialog({ engineId, open, onOpenChange }: AddApiConnectorDialogProps) {
  const [id, setId] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [authType, setAuthType] = useState('OAuth2');
  const [accessToken, setAccessToken] = useState('');
  const [settings, setSettings] = useState('');
  
  const addConnectorMutation = useAddApiConnector();
  const { data: tiktokTemplate } = useGetTikTokConnectorTemplate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const connector: ApiConnector = {
      id,
      engineId,
      baseUrl,
      authType,
      accessToken: accessToken || undefined,
      settings,
    };

    await addConnectorMutation.mutateAsync(connector);
    handleClose();
  };

  const handleClose = () => {
    setId('');
    setBaseUrl('');
    setAuthType('OAuth2');
    setAccessToken('');
    setSettings('');
    onOpenChange(false);
  };

  const loadTikTokTemplate = () => {
    if (tiktokTemplate) {
      setId(tiktokTemplate.id);
      setBaseUrl(tiktokTemplate.baseUrl);
      setAuthType(tiktokTemplate.authType);
      setSettings(tiktokTemplate.settings);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>APIコネクタを追加</DialogTitle>
          <DialogDescription>
            外部APIへの接続設定を登録します
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">手動設定</TabsTrigger>
            <TabsTrigger value="template" className="gap-1">
              <Sparkles className="h-3 w-3" />
              テンプレート
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">コネクタID *</Label>
                <Input
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="例: tiktok-connector"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseUrl">ベースURL *</Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="例: https://open-api.tiktok.com/"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authType">認証タイプ *</Label>
                <Select value={authType} onValueChange={setAuthType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OAuth2">OAuth2</SelectItem>
                    <SelectItem value="APIKey">APIキー</SelectItem>
                    <SelectItem value="Bearer">Bearer トークン</SelectItem>
                    <SelectItem value="Basic">Basic認証</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessToken">アクセストークン（オプション）</Label>
                <Input
                  id="accessToken"
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="後で設定することもできます"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="settings">設定（JSON形式）</Label>
                <Textarea
                  id="settings"
                  value={settings}
                  onChange={(e) => setSettings(e.target.value)}
                  placeholder='例: { "scopes": ["user.info.basic"], "redirect_uri": "..." }'
                  rows={4}
                  className="font-mono text-xs"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  キャンセル
                </Button>
                <Button type="submit" disabled={addConnectorMutation.isPending}>
                  {addConnectorMutation.isPending ? '追加中...' : '追加'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="template" className="space-y-4 mt-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                事前定義されたテンプレートを使用して、素早くAPIコネクタを設定できます。
              </AlertDescription>
            </Alert>

            <div className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm mb-1">TikTok API コネクタ</h4>
                  <p className="text-xs text-muted-foreground">
                    TikTok Open APIへの接続設定テンプレート
                  </p>
                </div>
                <Button 
                  onClick={loadTikTokTemplate} 
                  size="sm"
                  className="gap-2"
                >
                  <Sparkles className="h-3 w-3" />
                  使用する
                </Button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-muted-foreground">ベースURL</p>
                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                      {tiktokTemplate?.baseUrl}
                    </code>
                  </div>
                  <div>
                    <p className="text-muted-foreground">認証タイプ</p>
                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                      {tiktokTemplate?.authType}
                    </code>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">設定例</p>
                  <pre className="text-[10px] bg-muted p-2 rounded overflow-x-auto">
                    {tiktokTemplate?.settings}
                  </pre>
                </div>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-xs">
                  <strong>OAuth2フロー:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>TikTok Developer Portalでアプリを登録</li>
                    <li>Client IDとClient Secretを取得</li>
                    <li>リダイレクトURIを設定</li>
                    <li>認証URLにユーザーをリダイレクト</li>
                    <li>コールバックでアクセストークンを取得</li>
                    <li>取得したトークンをこのコネクタに設定</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
