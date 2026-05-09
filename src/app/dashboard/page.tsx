
import { getIntegratedPatientData } from "@/lib/data-service";
import { PatientHeader } from "@/components/dashboard/patient-header";
import { AISummaryCard } from "@/components/dashboard/ai-summary-card";
import { ReportSection } from "@/components/dashboard/report-section";
import { ClinicalAssistant } from "@/components/dashboard/clinical-assistant";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ abhaId?: string }>;
}) {
  const { abhaId } = await searchParams;

  if (!abhaId) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="p-8 bg-white rounded-2xl shadow-sm border text-center max-w-md">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No ABHA ID Provided</h2>
          <p className="text-muted-foreground mb-8">Please enter a valid ABHA ID to retrieve the integrated patient medical record.</p>
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Search
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const report = await getIntegratedPatientData(abhaId);

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="p-8 bg-white rounded-2xl shadow-sm border text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Record Not Found</h2>
          <p className="text-muted-foreground mb-8">No patient was found with the ID: <span className="font-mono text-foreground">{abhaId}</span>. Please verify the ID and try again.</p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Search
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Integrated Clinical History</h1>
          <p className="text-muted-foreground">Comprehensive view aggregated from fragmented healthcare sources</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">Export PDF</Button>
          <Button>Print Record</Button>
        </div>
      </div>

      <PatientHeader patient={report.patient} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ReportSection report={report} />
        </div>
        <div className="space-y-6">
          <AISummaryCard report={report} />
          
          <ClinicalAssistant report={report} />
          
          <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4">
            <h3 className="font-bold border-b pb-2">Data Sources</h3>
            <div className="space-y-3">
              <SourceIndicator name="Government Hospital A" type="Hospital" />
              <SourceIndicator name="Government Diagnostic Lab" type="Diagnostic" />
              <SourceIndicator name="Government Pharmacy" type="Pharmacy" />
              <SourceIndicator name="Emergency Records" type="Alert" />
            </div>
            <p className="text-[10px] text-muted-foreground pt-4 italic">
              Record pulled from ABDM Gateway v2.4. Data is aggregated using ABHA-linked secure tunnels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceIndicator({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-medium">{name}</span>
      </div>
      <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground">
        {type}
      </Badge>
    </div>
  );
}
