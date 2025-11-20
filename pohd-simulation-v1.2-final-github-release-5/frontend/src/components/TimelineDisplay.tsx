import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Flame } from 'lucide-react';

interface TimelineDisplayProps {
  currentYear: number;
}

export default function TimelineDisplay({ currentYear }: TimelineDisplayProps) {
  const years = Array.from({ length: 15 }, (_, i) => 2026 + i);
  
  return (
    <Card className="mb-8 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          タイムライン (2026-2040)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-chart-1 to-chart-2 -translate-y-1/2 transition-all duration-300"
            style={{
              width: `${((currentYear - 2026) / 14) * 100}%`,
            }}
          />
          <div className="relative flex justify-between items-center">
            {years.map((year) => {
              const isPast = year < currentYear;
              const isCurrent = year === currentYear;
              const isBurnEvent = year === 2035;
              
              return (
                <div key={year} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      isCurrent
                        ? 'bg-chart-1 border-chart-1 scale-150 shadow-lg shadow-chart-1/50'
                        : isPast
                        ? 'bg-chart-2 border-chart-2'
                        : 'bg-background border-border'
                    }`}
                  />
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`text-xs font-medium ${
                        isCurrent ? 'text-chart-1' : isPast ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {year}
                    </span>
                    {isBurnEvent && (
                      <Badge variant="destructive" className="text-[10px] px-1 py-0">
                        <Flame className="w-3 h-3 mr-1" />
                        +11.1%
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
