'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type IntegratedReport } from "@/lib/data-service";
import { Activity, Pill, FlaskConical, AlertTriangle, ClipboardList, Clock } from "lucide-react";

export function ReportSection({ report }: { report: IntegratedReport }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[400px] w-full bg-muted/10 animate-pulse rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="conditions" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b h-12 p-0 gap-6 rounded-none">
          <TabsTrigger value="conditions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent rounded-none px-0 h-full">
            <ClipboardList className="w-4 h-4 mr-2" />
            Conditions
          </TabsTrigger>
          <TabsTrigger value="medications" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent rounded-none px-0 h-full">
            <Pill className="w-4 h-4 mr-2" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="lab" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent rounded-none px-0 h-full">
            <FlaskConical className="w-4 h-4 mr-2" />
            Labs & Observations
          </TabsTrigger>
          <TabsTrigger value="allergies" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent rounded-none px-0 h-full">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Allergies
          </TabsTrigger>
          <TabsTrigger value="procedures" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary bg-transparent rounded-none px-0 h-full">
            <Activity className="w-4 h-4 mr-2" />
            Procedures
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="conditions">
            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Diagnosed Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.conditions.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold">{item.condition}</TableCell>
                      <TableCell>{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.medications.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold">{item.medication}</TableCell>
                      <TableCell>{item.dosage}</TableCell>
                      <TableCell>{item.frequency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="lab">
            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.observations.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold">{item.testName}</TableCell>
                      <TableCell>{item.value} {item.unit}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Abnormal' ? 'destructive' : 'default'} className="font-medium">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="allergies">
            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Allergen</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.allergies.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold">{item.allergy}</TableCell>
                      <TableCell>
                        <Badge className={
                          item.severity === 'Severe' ? 'bg-red-500' :
                          item.severity === 'Moderate' ? 'bg-orange-500' : 'bg-yellow-500'
                        }>
                          {item.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="procedures">
            <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.procedures.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold">{item.procedure}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.outcome}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Clock className="w-5 h-5 text-primary" />
            Encounter History
          </div>
          <div className="space-y-4">
            {report.encounters.map((enc, idx) => (
              <div key={idx} className="flex gap-4 items-start relative pb-4 last:pb-0">
                {idx !== report.encounters.length - 1 && (
                  <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-muted"></div>
                )}
                <div className="mt-1.5 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <div className="font-bold text-sm">{enc.type}</div>
                  <div className="text-xs text-muted-foreground">{enc.date} • {enc.doctor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Critical Alerts
          </div>
          <div className="space-y-3">
            {report.allergies.filter(a => a.severity === 'Severe').map((a, i) => (
              <div key={i} className="p-3 bg-red-50 border-l-4 border-red-500 text-sm flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Severe Allergy:</span> {a.allergy} detected. Extreme caution with prescribing.
                </div>
              </div>
            ))}
            {report.observations.filter(o => o.status === 'Abnormal').map((o, i) => (
              <div key={i} className="p-3 bg-orange-50 border-l-4 border-orange-500 text-sm flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Abnormal Lab:</span> {o.testName} is {o.value} {o.unit}.
                </div>
              </div>
            ))}
            {report.allergies.filter(a => a.severity === 'Severe').length === 0 && report.observations.filter(o => o.status === 'Abnormal').length === 0 && (
              <p className="text-sm text-muted-foreground italic">No critical clinical alerts at this time.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}