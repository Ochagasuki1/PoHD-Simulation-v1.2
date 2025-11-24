import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Info, Zap } from 'lucide-react';
import type { DaoInfo, EngineInfo, UserProfile } from '../backend';
import { useState } from 'react';
import DaoSettingsDialog from './DaoSettingsDialog';

interface DaoOverviewProps {
  daoInfo: DaoInfo | null | undefined;
  activeEngine: EngineInfo | null | undefined;
  userProfile: UserProfile | null | undefined;
}

export default function DaoOverview({ daoInfo, activeEngine, userProfile }: DaoOverviewProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isAdmin = userProfile?.role === 'admin';

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">DAOダッシュボード</h2>
            <p className="text-muted-foreground">組織の概要とアクティブエンジン</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setSettingsOpen(true)} className="gap-2">
              <Settings className="h-4 w-4" />
              DAO設定
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* DAO Info Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  DAO情報
                </CardTitle>
                {daoInfo && <Badge variant="outline">アクティブ</Badge>}
              </div>
              <CardDescription>組織の基本情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {daoInfo ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">名前</p>
                    <p className="text-lg font-semibold">{daoInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">説明</p>
                    <p className="text-sm">{daoInfo.description}</p>
                  </div>
                  {daoInfo.settings && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">設定</p>
                      <p className="text-sm text-muted-foreground">{daoInfo.settings}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">DAO情報が設定されていません</p>
                  {isAdmin && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => setSettingsOpen(true)}
                    >
                      今すぐ設定
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Engine Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  アクティブエンジン
                </CardTitle>
                {activeEngine && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                    実行中
                  </Badge>
                )}
              </div>
              <CardDescription>現在使用中のDAOエンジン</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeEngine ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">エンジン名</p>
                    <p className="text-lg font-semibold">{activeEngine.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">説明</p>
                    <p className="text-sm">{activeEngine.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">エンジンID</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{activeEngine.id}</code>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">アクティブなエンジンがありません</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    下のエンジンマネージャーからエンジンを選択してください
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isAdmin && (
        <DaoSettingsDialog 
          open={settingsOpen} 
          onOpenChange={setSettingsOpen}
          currentDaoInfo={daoInfo}
        />
      )}
    </>
  );
}
