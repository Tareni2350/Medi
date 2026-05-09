import { getIntegratedPatientData } from "@/lib/data-service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FlaskConical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DiagnosticsCharts } from "@/components/dashboard/diagnostics-charts";

export default async function DiagnosticsPage({
  searchParams,
}: {
  searchParams: Promise<{ abhaId?: string }>;
}) {
  const { abhaId } = await searchParams;

  if (!abhaId) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Card className="max-w-md text-center p-8">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Patient ID Required</h2>
          <p className="text-muted-foreground mb-6">Select a patient from the sidebar to view diagnostic trends.</p>
          <Button asChild><Link href="/">Go to Search</Link></Button>
        </Card>
      </div>
    );
  }

  const report = await getIntegratedPatientData(abhaId);

  if (!report) return null;

  // Prepare data for glucose trends
  const glucoseData = report.observations
    .filter(o => o.testName === 'Fasting Blood Glucose')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(o => ({
      date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(o.value)
    }));

  const hba1cData = report.observations
    .filter(o => o.testName === 'HbA1c')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(o => ({
      date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(o.value)
    }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Diagnostics & Lab Trends</h1>
          <p className="text-muted-foreground">Historical analysis of clinical observations and laboratory markers</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/dashboard?abhaId=${abhaId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Link>
        </Button>
      </div>

      <DiagnosticsCharts glucoseData={glucoseData} hba1cData={hba1cData} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5" />
            Full Laboratory History
          </CardTitle>
          <CardDescription>Detailed log of all synchronized diagnostic results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source Facility</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.observations.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-semibold">{item.testName}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.value} {item.unit}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Abnormal' ? 'destructive' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
