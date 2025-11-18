import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Wallet } from 'lucide-react';

interface CWChartProps {
  data: number[];
}

export default function CWChart({ data }: CWChartProps) {
  const chartData = data.map((value, index) => ({
    day: index,
    cw: value / 1_000_000, // Convert to millions
  }));

  const chartConfig = {
    cw: {
      label: 'CW (百万)',
      color: 'oklch(var(--chart-2))',
    },
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-chart-2" />
          総コミュニティウェルス
        </CardTitle>
        <CardDescription>CW累積成長（百万単位）</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCW" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-cw)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-cw)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="day"
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="cw"
                  stroke="var(--color-cw)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCW)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            データがありません
          </div>
        )}
      </CardContent>
    </Card>
  );
}
