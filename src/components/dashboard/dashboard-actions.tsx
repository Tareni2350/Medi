'use client';

import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export function DashboardActions() {
  const handleExport = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="flex gap-3 no-print">
      <Button 
        variant="outline" 
        className="bg-white border-primary/20 hover:bg-primary/5"
        onClick={handleExport}
      >
        <FileDown className="w-4 h-4 mr-2 text-primary" />
        Export to PDF
      </Button>
    </div>
  );
}
