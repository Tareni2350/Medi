'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp } from "lucide-react";
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
      <div className="grid md:grid-cols-2 gap-6 h-[400px]">
        <Card className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground italic">Loading Glucose Trends...</p>
        </Card>
        <Card className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground italic">Loading HbA1c Analysis...</p>
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
            Fasting Blood Glucose Trend
          </CardTitle>
          <CardDescription>Values measured in mg/dL over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ value: { label: "Glucose", color: "hsl(var(--primary))" } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
