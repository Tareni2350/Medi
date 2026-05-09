'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateMedicalSummary, type AIMedicalSummaryInput } from '@/ai/flows/ai-medical-summary-generator';
import { type IntegratedReport } from '@/lib/data-service';

export function AISummaryCard({ report }: { report: IntegratedReport }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const input: AIMedicalSummaryInput = {
          abhaId: report.patient.abhaId,
          patientName: report.patient.name,
          age: report.patient.age,
          gender: report.patient.gender,
          conditions: report.conditions.map(c => c.condition),
          medications: report.medications.map(m => m.medication),
          abnormalObservations: report.observations
            .filter(o => o.status === 'Abnormal')
            .map(o => `${o.testName}: ${o.value} ${o.unit}`),
          allergies: report.allergies.map(a => `${a.allergy} (${a.severity})`),
          procedures: report.procedures.map(p => p.procedure),
        };
        
        const result = await generateMedicalSummary(input);
        setSummary(result.summary);
      } catch (err) {
        console.error('Error generating AI summary:', err);
        setError('Unable to generate AI summary at this time.');
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [report]);

  return (
    <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5 fill-primary/20" />
          AI Medical Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Synthesizing fragmented records into clinical insights...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed italic">
            "{summary}"
          </div>
        )}
      </CardContent>
    </Card>
  );
}
