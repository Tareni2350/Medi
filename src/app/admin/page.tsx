import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientUploadForm } from "@/components/admin/patient-upload-form";
import { Activity, Users, Database, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage data synchronization and patient registrations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Integrated Records" 
          value="12,482" 
          description="+18% from last month" 
          icon={Database}
          trend="up"
        />
        <StatCard 
          title="Active Patients" 
          value="8,230" 
          description="Verified via ABHA" 
          icon={Users}
          trend="up"
        />
        <StatCard 
          title="System Sync Health" 
          value="99.9%" 
          description="All nodes operational" 
          icon={Activity}
          trend="up"
        />
        <StatCard 
          title="Pending Verifications" 
          value="14" 
          description="Awaiting documentation" 
          icon={ShieldAlert}
          trend="down"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Register New Patient Record</CardTitle>
              <CardDescription>
                Manually upload clinical data to the MediSync network. This data will be linked via the ABHA ID.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientUploadForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Sync Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem 
                  title="Lab Report Sync" 
                  details="Central Node A" 
                  time="2 mins ago" 
                  status="Success" 
                />
                <ActivityItem 
                  title="Patient Registration" 
                  details="Clinical Node B" 
                  time="15 mins ago" 
                  status="Success" 
                />
                <ActivityItem 
                  title="Medication Log Update" 
                  details="Pharmacy Node C" 
                  time="1 hour ago" 
                  status="Success" 
                />
                <ActivityItem 
                  title="Critical Alert Triggered" 
                  details="Emergency Node D" 
                  time="3 hours ago" 
                  status="Alert" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Connectivity Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ABDM Gateway</span>
                <span className="text-green-600 font-bold">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Regional HL7 Node</span>
                <span className="text-green-600 font-bold">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clinical Ledger</span>
                <span className="text-green-600 font-bold">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon: Icon, trend }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, details, time, status }: any) {
  return (
    <div className="flex items-start gap-3 text-sm pb-4 last:pb-0">
      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${status === 'Alert' ? 'bg-destructive' : 'bg-primary'}`} />
      <div className="space-y-1">
        <p className="font-medium leading-none">{title}</p>
        <p className="text-xs text-muted-foreground">{details} • {time}</p>
      </div>
    </div>
  );
}
