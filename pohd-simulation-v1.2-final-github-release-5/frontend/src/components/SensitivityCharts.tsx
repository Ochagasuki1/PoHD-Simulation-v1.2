import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Wallet, TrendingUp, Users } from 'lucide-react';
import type { ScenarioResult } from '@/backend';

interface SensitivityChartsProps {
  results: ScenarioResult[];
}

export default function SensitivityCharts({ results }: SensitivityChartsProps) {
  const hcsData = results.map((r) => ({
    name: r.scenarioName.length > 15 ? r.scenarioName.substring(0, 15) + '...' : r.scenarioName,
    value: r.finalHCS,
  }));

  const cwData = results.map((r) => ({
    name: r.scenarioName.length > 15 ? r.scenarioName.substring(0, 15) + '...' : r.scenarioName,
    value: r.finalCW,
  }));

  const gdpData = results.map((r) => ({
    name: r.scenarioName.length > 15 ? r.scenarioName.substring(0, 15) + '...' : r.scenarioName,
    value: r.finalGDPIndex,
  }));

  const cagrData = results.map((r) => ({
    name: r.scenarioName.length > 15 ? r.scenarioName.substring(0, 15) + '...' : r.scenarioName,
    value: r.cagr2035_2040 * 100,
  }));

  const chartConfig = {
    value: {
      label: '値',
      color: 'oklch(var(--chart-1))',
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-chart-1" />
              最終HCS比較
            </CardTitle>
            <CardDescription>各シナリオの最終人的資本スコア</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hcsData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 1]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-chart-2" />
              最終CW比較
            </CardTitle>
            <CardDescription>各シナリオの最終コミュニティウェルス（百万）</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ ...chartConfig, value: { label: '値', color: 'oklch(var(--chart-2))' } }} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cwData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-chart-3" />
              最終GDP指数比較
            </CardTitle>
            <CardDescription>各シナリオの最終GDP指数（2026=100基準）</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ ...chartConfig, value: { label: '値', color: 'oklch(var(--chart-3))' } }} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gdpData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-chart-4" />
              CAGR 2035-2040比較
            </CardTitle>
            <CardDescription>各シナリオの年平均成長率（%）</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ ...chartConfig, value: { label: '値', color: 'oklch(var(--chart-4))' } }} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cagrData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="oklch(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
