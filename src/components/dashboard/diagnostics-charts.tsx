'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Loader2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  date: string;
  value: number;
}

interface DiagnosticsChartsProps {
  glucoseData: ChartDataPoint[];
  hba1cData: ChartDataPoint[];
}

export function DiagnosticsCharts({ glucoseData, hba1cData }: DiagnosticsChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid md:grid-cols-2 gap-6 min-h-[400px]">
        <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground italic">Preparing Glucose Trends...</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-12 text-center space-y-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-sm text-muted-foreground italic">Analyzing HbA1c History...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Blood Glucose Trend
          </CardTitle>
          <CardDescription>Measured in mg/dL over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ value: { label: "Glucose", color: "hsl(var(--primary))" } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "var(--color-value)" }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            HbA1c Analysis
          </CardTitle>
          <CardDescription>Glycated hemoglobin percentage trend</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ value: { label: "HbA1c", color: "hsl(var(--accent))" } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hba1cData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis 
                  domain={[4, 10]}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "var(--color-value)" }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
