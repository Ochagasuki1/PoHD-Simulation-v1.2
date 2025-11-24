import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Zap, Check, Plug } from 'lucide-react';
import type { EngineInfo, UserProfile } from '../backend';
import { useState } from 'react';
import AddEngineDialog from './AddEngineDialog';
import ApiConnectorManager from './ApiConnectorManager';
import { useSetActiveEngine } from '../hooks/useQueries';

interface EngineManagerProps {
  activeEngine: EngineInfo | null | undefined;
  availableEngines: EngineInfo[];
  userProfile: UserProfile | null | undefined;
}

export default function EngineManager({ activeEngine, availableEngines, userProfile }: EngineManagerProps) {
  const [addEngineOpen, setAddEngineOpen] = useState(false);
  const setActiveEngineMutation = useSetActiveEngine();
  const isAdmin = userProfile?.role === 'admin';

  const handleSetActive = async (engineId: string) => {
    await setActiveEngineMutation.mutateAsync(engineId);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">エンジンマネージャー</h2>
            <p className="text-muted-foreground">利用可能なDAOエンジンの管理</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setAddEngineOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              エンジン追加
            </Button>
          )}
        </div>

        {availableEngines.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="py-16 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">エンジンがありません</h3>
              <p className="text-muted-foreground mb-6">
                まだエンジンが登録されていません。最初のエンジンを追加してください。
              </p>
              {isAdmin && (
                <Button onClick={() => setAddEngineOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  最初のエンジンを追加
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableEngines.map((engine) => {
              const isActive = activeEngine?.id === engine.id;
              return (
                <Card 
                  key={engine.id} 
                  className={`border-border/50 bg-card/50 backdrop-blur transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{engine.name}</CardTitle>
                          {isActive && (
                            <Badge variant="outline" className="mt-1 gap-1">
                              <Check className="h-3 w-3" />
                              アクティブ
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{engine.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs defaultValue="info" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">情報</TabsTrigger>
                        <TabsTrigger value="api" className="gap-1">
                          <Plug className="h-3 w-3" />
                          API
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="info" className="space-y-4 mt-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">エンジンID</p>
                          <code className="text-xs bg-muted px-2 py-1 rounded block truncate">
                            {engine.id}
                          </code>
                        </div>
                        {engine.settings && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">設定</p>
                            <p className="text-xs text-muted-foreground">{engine.settings}</p>
                          </div>
                        )}
                        {isAdmin && !isActive && (
                          <Button 
                            onClick={() => handleSetActive(engine.id)}
                            disabled={setActiveEngineMutation.isPending}
                            className="w-full gap-2"
                            variant="outline"
                          >
                            <Zap className="h-4 w-4" />
                            アクティブにする
                          </Button>
                        )}
                      </TabsContent>
                      <TabsContent value="api" className="mt-4">
                        <ApiConnectorManager engineId={engine.id} isAdmin={isAdmin} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {isAdmin && (
        <AddEngineDialog 
          open={addEngineOpen} 
          onOpenChange={setAddEngineOpen}
        />
      )}
    </>
  );
}
