import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FlaskConical, Download, Image as ImageIcon, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useRunSensitivityAnalysis } from '@/hooks/useQueries';
import type { ScenarioResult } from '@/backend';
import SensitivityCharts from './SensitivityCharts';

export default function SensitivityAnalysis() {
  const [results, setResults] = useState<ScenarioResult[] | null>(null);
  const [progress, setProgress] = useState(0);
  const runAnalysis = useRunSensitivityAnalysis();

  const handleRunAnalysis = async () => {
    setProgress(0);
    setResults(null);
    
    toast.info('感度分析開始', {
      description: '全10ケースの実行を開始します（約3〜5分）',
    });

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 15000); // Update every 15 seconds

      const analysisResults = await runAnalysis.mutateAsync();
      
      clearInterval(progressInterval);
      setProgress(100);
      setResults(analysisResults);
      
      toast.success('感度分析完了', {
        description: '全10ケースの実行が完了しました',
      });
    } catch (error) {
      toast.error('感度分析エラー', {
        description: '分析の実行に失敗しました',
      });
      setProgress(0);
    }
  };

  const handleDownloadCSV = () => {
    if (!results) return;

    const headers = [
      'シナリオ名',
      'α',
      'β',
      'γ',
      'バーン倍率',
      '最終HCS',
      '最終CW (百万)',
      '最終GDP指数',
      'CAGR 2035-2040 (%)',
      '適格率 (%)',
    ];

    const rows = results.map((r) => [
      r.scenarioName,
      r.alpha.toFixed(2),
      r.beta.toFixed(2),
      r.gamma.toFixed(2),
      r.burnMultiplier.toFixed(3),
      r.finalHCS.toFixed(4),
      r.finalCW.toFixed(2),
      r.finalGDPIndex.toFixed(2),
      (r.cagr2035_2040 * 100).toFixed(2),
      (r.eligibleRatio * 100).toFixed(1),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pohd_sensitivity_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('CSVダウンロード完了', {
      description: 'データをCSVファイルとして保存しました',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-chart-3" />
            パラメータ感度分析
          </CardTitle>
          <CardDescription>
            10種類のパラメータシナリオで完全シミュレーション（2026-2040）を実行し、経済指標への影響を比較分析
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>分析について</AlertTitle>
            <AlertDescription>
              各シナリオは5,479日（15年間）の完全シミュレーションを実行します。
              α（成長率）、β（ストレス減衰）、γ（変動幅）、バーン倍率の異なる組み合わせで、
              最終HCS、CW、GDP指数、CAGR、適格率を測定します。
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              onClick={handleRunAnalysis}
              disabled={runAnalysis.isPending}
              size="lg"
              className="w-full bg-gradient-to-r from-chart-3 to-chart-4 hover:from-chart-3/90 hover:to-chart-4/90"
            >
              <FlaskConical className="w-4 h-4 mr-2" />
              {runAnalysis.isPending ? '実行中...' : '全10ケース自動実行（約3〜5分）'}
            </Button>

            {runAnalysis.isPending && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">進行状況</span>
                  <Badge variant="outline">{progress}%</Badge>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  各シナリオで15年間のシミュレーションを実行中...
                </p>
              </div>
            )}
          </div>

          {results && results.length > 0 && (
            <>
              <div className="flex gap-3">
                <Button
                  onClick={handleDownloadCSV}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  CSV ダウンロード
                </Button>
              </div>

              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">シナリオ名</TableHead>
                        <TableHead className="text-right">α</TableHead>
                        <TableHead className="text-right">β</TableHead>
                        <TableHead className="text-right">γ</TableHead>
                        <TableHead className="text-right">バーン倍率</TableHead>
                        <TableHead className="text-right">最終HCS</TableHead>
                        <TableHead className="text-right">最終CW (M)</TableHead>
                        <TableHead className="text-right">最終GDP指数</TableHead>
                        <TableHead className="text-right">CAGR 35-40</TableHead>
                        <TableHead className="text-right">適格率</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{result.scenarioName}</TableCell>
                          <TableCell className="text-right">{result.alpha.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{result.beta.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{result.gamma.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{result.burnMultiplier.toFixed(3)}</TableCell>
                          <TableCell className="text-right">{result.finalHCS.toFixed(4)}</TableCell>
                          <TableCell className="text-right">{result.finalCW.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{result.finalGDPIndex.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            {(result.cagr2035_2040 * 100).toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {(result.eligibleRatio * 100).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <SensitivityCharts results={results} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
