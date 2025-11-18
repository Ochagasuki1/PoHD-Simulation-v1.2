import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Play, Pause, RotateCcw, Zap, TrendingUp, Users, Calendar, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import {
  useInitializeUsers,
  useRunDailyStep,
  useResetSimulation,
  useSimulationState,
  useHistoricalData,
} from '@/hooks/useQueries';
import HCSChart from '@/components/HCSChart';
import CWChart from '@/components/CWChart';
import GDPChart from '@/components/GDPChart';
import TimelineDisplay from '@/components/TimelineDisplay';
import StatsCard from '@/components/StatsCard';

export default function SimulationDashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100); // milliseconds between steps
  const [isBetaTestRunning, setIsBetaTestRunning] = useState(false);

  const initializeUsers = useInitializeUsers();
  const runDailyStep = useRunDailyStep();
  const resetSimulation = useResetSimulation();
  const { data: state, refetch: refetchState } = useSimulationState();
  const { data: historical, refetch: refetchHistorical } = useHistoricalData();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && state && state.currentYear <= 2040) {
      interval = setInterval(async () => {
        try {
          await runDailyStep.mutateAsync();
          await refetchState();
          await refetchHistorical();
        } catch (error) {
          console.error('Step error:', error);
          setIsRunning(false);
        }
      }, speed);
    } else if (state && state.currentYear > 2040) {
      setIsRunning(false);
      toast.success('シミュレーション完了', {
        description: '2040年に到達しました',
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, speed, state, runDailyStep, refetchState, refetchHistorical]);

  const handleInitialize = async () => {
    try {
      await initializeUsers.mutateAsync();
      await refetchState();
      await refetchHistorical();
      toast.success('初期化完了', {
        description: '1,000人のベータユーザーを生成しました',
      });
    } catch (error) {
      toast.error('初期化エラー', {
        description: 'ユーザーの初期化に失敗しました',
      });
    }
  };

  const handleBetaTest = async () => {
    if (state && state.userCount > 0) {
      toast.error('エラー', {
        description: 'シミュレーションをリセットしてから実行してください',
      });
      return;
    }

    setIsBetaTestRunning(true);
    try {
      // Initialize users
      await initializeUsers.mutateAsync();
      await refetchState();
      await refetchHistorical();

      toast.success('βテストモード起動：PoHDシミュレーションが開始されました。', {
        description: '30日間のシミュレーションを実行中...',
      });

      // Run 30 daily steps
      for (let i = 0; i < 30; i++) {
        await runDailyStep.mutateAsync();
        if (i % 5 === 0) {
          // Refresh every 5 steps for visual feedback
          await refetchState();
          await refetchHistorical();
        }
      }

      // Final refresh
      await refetchState();
      await refetchHistorical();

      toast.success('βテスト完了', {
        description: '30日間のシミュレーションが完了しました',
      });
    } catch (error) {
      toast.error('βテストエラー', {
        description: 'βテストの実行に失敗しました',
      });
    } finally {
      setIsBetaTestRunning(false);
    }
  };

  const handleReset = async () => {
    setIsRunning(false);
    try {
      await resetSimulation.mutateAsync();
      await refetchState();
      await refetchHistorical();
      toast.success('リセット完了', {
        description: 'シミュレーションをリセットしました',
      });
    } catch (error) {
      toast.error('リセットエラー', {
        description: 'リセットに失敗しました',
      });
    }
  };

  const handleToggleRunning = () => {
    if (!state || state.userCount === 0) {
      toast.error('エラー', {
        description: '先にシミュレーションを初期化してください',
      });
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleSingleStep = async () => {
    if (!state || state.userCount === 0) {
      toast.error('エラー', {
        description: '先にシミュレーションを初期化してください',
      });
      return;
    }
    try {
      await runDailyStep.mutateAsync();
      await refetchState();
      await refetchHistorical();
    } catch (error) {
      toast.error('ステップエラー', {
        description: '日次ステップの実行に失敗しました',
      });
    }
  };

  const progressPercent = state ? ((state.currentYear - 2026) / (2040 - 2026)) * 100 : 0;
  const isBurnEventYear = state?.currentYear === 2035;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
                PoHD シミュレーション v1.1
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                人間の尊厳の証明 - 経済シミュレーションシステム
              </p>
            </div>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              {state?.userCount || 0} ユーザー
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Control Panel */}
        <Card className="mb-8 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-chart-1" />
              制御パネル
            </CardTitle>
            <CardDescription>シミュレーションの実行と管理</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleBetaTest}
                disabled={isBetaTestRunning || (state?.userCount ?? 0) > 0}
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90"
              >
                <Rocket className="w-4 h-4 mr-2" />
                {isBetaTestRunning ? '実行中...' : 'βテスト開始'}
              </Button>
              <Button
                onClick={handleInitialize}
                disabled={initializeUsers.isPending || (state?.userCount ?? 0) > 0}
                variant="outline"
                size="lg"
              >
                <Users className="w-4 h-4 mr-2" />
                初期化
              </Button>
              <Button
                onClick={handleToggleRunning}
                disabled={!state || state.userCount === 0}
                variant={isRunning ? 'destructive' : 'default'}
                size="lg"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    一時停止
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    実行
                  </>
                )}
              </Button>
              <Button
                onClick={handleSingleStep}
                disabled={!state || state.userCount === 0 || isRunning}
                variant="outline"
                size="lg"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                1日進める
              </Button>
              <Button
                onClick={handleReset}
                disabled={resetSimulation.isPending}
                variant="outline"
                size="lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                リセット
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {state?.currentYear || 2026}年 - 第{state?.currentDay || 0}日
                  </span>
                </div>
                {isBurnEventYear && (
                  <Badge variant="destructive" className="animate-pulse">
                    🔥 バーンイベント年
                  </Badge>
                )}
              </div>
              <Progress value={progressPercent} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2026年</span>
                <span>2040年</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">実行速度:</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={speed === 500 ? 'default' : 'outline'}
                  onClick={() => setSpeed(500)}
                >
                  遅い
                </Button>
                <Button
                  size="sm"
                  variant={speed === 100 ? 'default' : 'outline'}
                  onClick={() => setSpeed(100)}
                >
                  標準
                </Button>
                <Button
                  size="sm"
                  variant={speed === 10 ? 'default' : 'outline'}
                  onClick={() => setSpeed(10)}
                >
                  高速
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="平均HCS"
            value={state?.averageHCS?.toFixed(3) || '0.000'}
            description="人的資本スコア"
            trend={historical?.hcs && historical.hcs.length > 1 ? 
              ((historical.hcs[historical.hcs.length - 1] - historical.hcs[historical.hcs.length - 2]) > 0 ? 'up' : 'down') : undefined}
          />
          <StatsCard
            title="総CW"
            value={`${((state?.totalCW || 0) / 1_000_000).toFixed(2)}M`}
            description="コミュニティウェルス（百万）"
            trend="up"
          />
          <StatsCard
            title="GDP指数"
            value={state?.gdpIndex?.toFixed(4) || '1.0000'}
            description="経済成長指標"
            trend={historical?.gdp && historical.gdp.length > 1 ? 
              ((historical.gdp[historical.gdp.length - 1] - historical.gdp[historical.gdp.length - 2]) > 0 ? 'up' : 'down') : undefined}
          />
          <StatsCard
            title="総VDF"
            value={state?.totalVDF?.toFixed(2) || '0.00'}
            description="検証可能遅延関数時間"
            trend="up"
          />
        </div>

        {/* Timeline */}
        <TimelineDisplay currentYear={state?.currentYear || 2026} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <HCSChart data={historical?.hcs || []} />
          <CWChart data={historical?.cw || []} />
        </div>

        <div className="mb-8">
          <GDPChart data={historical?.gdp || []} currentDay={state?.currentDay || 0} />
        </div>
      </main>

      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025. Built with ❤️ using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>α = 0.15</span>
              <span>β = 0.10</span>
              <span>γ = 0.05</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
