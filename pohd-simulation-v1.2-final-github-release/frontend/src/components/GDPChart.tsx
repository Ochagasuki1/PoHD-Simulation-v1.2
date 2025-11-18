import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface GDPChartProps {
  data: number[];
  currentDay: number;
}

export default function GDPChart({ data, currentDay }: GDPChartProps) {
  const chartData = data.map((value, index) => {
    const year = 2026 + Math.floor(index / 365);
    return {
      day: index,
      year,
      gdp: value,
    };
  });

  // Find the day index for 2035 (burn event year)
  const burnEventDayIndex = (2035 - 2026) * 365;

  const chartConfig = {
    gdp: {
      label: 'GDP指数',
      color: 'oklch(var(--chart-3))',
    },
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-chart-3" />
          GDP指数の進化
        </CardTitle>
        <CardDescription>
          経済成長モデル: Y_t = A₀ e^(0.03t) × (PHD)^0.4 × (HCS)^0.3 × (1 + Burn_t)^0.3
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="day"
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const year = 2026 + Math.floor(value / 365);
                    return year.toString();
                  }}
                />
                <YAxis
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => {
                    const year = 2026 + Math.floor(Number(value) / 365);
                    return `${year}年`;
                  }}
                />
                {currentDay >= burnEventDayIndex && (
                  <ReferenceLine
                    x={burnEventDayIndex}
                    stroke="oklch(var(--destructive))"
                    strokeDasharray="3 3"
                    label={{
                      value: '2035 バーンイベント',
                      position: 'top',
                      fill: 'oklch(var(--destructive))',
                      fontSize: 12,
                    }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="gdp"
                  stroke="var(--color-gdp)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            データがありません
          </div>
        )}
      </CardContent>
    </Card>
  );
}
