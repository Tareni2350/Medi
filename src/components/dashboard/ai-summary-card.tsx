'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Loader2, AlertCircle, Volume2, Square, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { generateMedicalSummary, type AIMedicalSummaryInput } from '@/ai/flows/ai-medical-summary-generator';
import { textToSpeech } from '@/ai/flows/audio-summary-flow';
import { type IntegratedReport } from '@/lib/data-service';

export function AISummaryCard({ report }: { report: IntegratedReport }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
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
    } catch (err: any) {
      console.error('Error generating AI summary:', err);
      if (err.message?.includes('429') || err.message?.includes('quota')) {
        setError('Rate limit exceeded. Please wait a few seconds and try again.');
      } else {
        setError('Unable to generate AI summary at this time.');
      }
    } finally {
      setLoading(false);
    }
  }, [report]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const handleToggleAudio = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (audioUrl) {
      setIsPlaying(true);
      return;
    }

    if (!summary) return;

    setAudioLoading(true);
    try {
      const result = await textToSpeech(summary);
      setAudioUrl(result.media);
      setIsPlaying(true);
    } catch (err) {
      console.error('Error generating audio:', err);
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5 fill-primary/20" />
          AI Medical Summary
        </CardTitle>
        <div className="flex gap-1">
          {error && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchSummary}
              className="text-primary"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          )}
          {!loading && !error && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleToggleAudio} 
              disabled={audioLoading}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              {audioLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying ? (
                <Square className="h-4 w-4 fill-current" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">{isPlaying ? 'Stop' : 'Listen'}</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isPlaying && audioUrl && (
          <audio 
            autoPlay 
            onEnded={() => setIsPlaying(false)} 
            className="hidden"
          >
            <source src={audioUrl} type="audio/wav" />
          </audio>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Synthesizing fragmented records into clinical insights...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Notice</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={fetchSummary} variant="outline" size="sm" className="w-full">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry Generation
            </Button>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed italic">
            "{summary}"
          </div>
        )}
      </CardContent>
    </Card>
  );
}
