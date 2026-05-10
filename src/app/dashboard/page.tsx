import { getIntegratedPatientData } from "@/lib/data-service";
import { PatientHeader } from "@/components/dashboard/patient-header";
import { AISummaryCard } from "@/components/dashboard/ai-summary-card";
import { ReportSection } from "@/components/dashboard/report-section";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";

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
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-bold">Integrated Clinical History</h1>
          <p className="text-muted-foreground">Comprehensive view aggregated from fragmented healthcare data</p>
        </div>
        <DashboardActions />
      </div>

      <div className="hidden print:block text-center border-b pb-4 mb-8">
        <h1 className="text-3xl font-bold">MediSync AI - Integrated Patient Report</h1>
        <p className="text-sm text-muted-foreground">Confidential Medical Record Summary</p>
      </div>

      <PatientHeader patient={report.patient} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ReportSection report={report} />
        </div>
        <div className="space-y-6">
          <div className="print:mb-8">
            <AISummaryCard report={report} />
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4 break-inside-avoid">
            <h3 className="font-bold border-b pb-2">System Information</h3>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              Records are consolidated from the ABDM Gateway v2.4. All data is aggregated using secure ABHA-linked tunnels to ensure longitudinal record integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}