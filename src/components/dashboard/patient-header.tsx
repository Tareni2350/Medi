import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type Patient } from "@/lib/mock-data";
import { Mail, Phone, Calendar, User, HeartPulse } from "lucide-react";

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-xl shadow-sm border gap-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-primary/10">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback className="text-2xl">{patient.name.charAt(0)}</AvatarFallback>
        </Avatar>
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
