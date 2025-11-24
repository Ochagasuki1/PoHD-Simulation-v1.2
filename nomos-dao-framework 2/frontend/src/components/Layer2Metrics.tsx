import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Scale } from 'lucide-react';
import type { Layer2Output } from '../backend';

interface Layer2MetricsProps {
  outputs: Layer2Output[];
}

export default function Layer2Metrics({ outputs }: Layer2MetricsProps) {
  const totalInfluence = outputs.reduce((sum, output) => sum + Number(output.influenceScore), 0);
  const totalVotingPower = outputs.reduce((sum, output) => sum + Number(output.votingPower), 0);
  const averageInfluence = outputs.length > 0 ? Math.round(totalInfluence / outputs.length) : 0;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Layer 2: エンジン出力層
          </CardTitle>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            {outputs.length} メンバー
          </Badge>
        </div>
        <CardDescription>標準化されたエンジン出力データ</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>総影響力スコア</span>
            </div>
            <p className="text-2xl font-bold">{totalInfluence.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Scale className="h-4 w-4" />
              <span>総投票権重</span>
            </div>
            <p className="text-2xl font-bold">{totalVotingPower.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>平均影響力</span>
            </div>
            <p className="text-2xl font-bold">{averageInfluence.toLocaleString()}</p>
          </div>
        </div>

        {outputs.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">メンバー別スコア</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {outputs.map((output, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-muted-foreground truncate">
                      {output.memberId.toString()}
                    </p>
                  </div>
                  <div className="flex gap-4 ml-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">影響力</p>
                      <p className="text-sm font-semibold">{Number(output.influenceScore).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">投票権</p>
                      <p className="text-sm font-semibold">{Number(output.votingPower).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Layer 2出力データがありません</p>
            <p className="text-sm text-muted-foreground mt-2">
              エンジンが実行されるとデータが表示されます
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
