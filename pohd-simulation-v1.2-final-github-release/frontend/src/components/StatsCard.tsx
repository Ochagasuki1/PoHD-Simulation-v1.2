import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down';
}

export default function StatsCard({ title, value, description, trend }: StatsCardProps) {
  return (
    <Card className="border-border/50 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-2">
        <CardDescription className="text-xs">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          {trend && (
            <div className={trend === 'up' ? 'text-chart-1' : 'text-destructive'}>
              {trend === 'up' ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
