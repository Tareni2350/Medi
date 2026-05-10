import { Badge } from "@/components/ui/badge";
import { type Patient } from "@/lib/mock-data";
import { Mail, Phone, User, HeartPulse, Calendar } from "lucide-react";

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-xl shadow-sm border gap-6">
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
          <User className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">{patient.name}</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
              ABHA Active
            </Badge>
          </div>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            ID: <span className="text-foreground">{patient.abhaId}</span>
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {patient.age} yrs • {patient.gender}
            </div>
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-destructive" />
              Blood: {patient.bloodGroup}
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              {patient.email}
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              {patient.phone}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2 text-right">
        <div className="text-sm text-muted-foreground">Last Synced</div>
        <div className="flex items-center gap-2 font-semibold">
          <Calendar className="w-4 h-4 text-primary" />
          Today, 09:45 AM
        </div>
      </div>
    </div>
  );
}
