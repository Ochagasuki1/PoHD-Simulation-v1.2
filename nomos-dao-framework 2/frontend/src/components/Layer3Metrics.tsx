import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, PieChart, Vote } from 'lucide-react';
import type { Layer3Data } from '../backend';

interface Layer3MetricsProps {
  data: Layer3Data | null | undefined;
}

export default function Layer3Metrics({ data }: Layer3MetricsProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Layer 3: ガバナンス・配布層
          </CardTitle>
          {data && (
            <Badge variant="outline" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              アクティブ
            </Badge>
          )}
        </div>
        <CardDescription>報酬プールと配布管理</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data ? (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Coins className="h-4 w-4" />
                  <span>報酬プール</span>
                </div>
                <p className="text-2xl font-bold">{Number(data.rewardPool).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">トークン</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Vote className="h-4 w-4" />
                  <span>アクティブ投票</span>
                </div>
                <p className="text-2xl font-bold">{Number(data.activeVotes).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">進行中の提案</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PieChart className="h-4 w-4" />
                  <span>配布ステータス</span>
                </div>
                <Badge className="mt-1 bg-gradient-to-r from-green-500 to-emerald-500">
                  正常
                </Badge>
              </div>
            </div>

            {data.distributionRatios && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">配布比率</h4>
                <div className="p-4 rounded-lg bg-muted/50">
                  <pre className="text-xs overflow-x-auto">
                    {data.distributionRatios}
                  </pre>
                </div>
              </div>
            )}

            {data.distributionHistory && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">配布履歴</h4>
                <div className="p-4 rounded-lg bg-muted/50">
                  <pre className="text-xs overflow-x-auto">
                    {data.distributionHistory}
                  </pre>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Layer 3データが設定されていません</p>
            <p className="text-sm text-muted-foreground mt-2">
              ガバナンスと配布システムが初期化されると表示されます
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
