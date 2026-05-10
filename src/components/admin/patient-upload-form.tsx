'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, UploadCloud } from "lucide-react";

export function PatientUploadForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Patient Registered Successfully",
      description: "The record has been encrypted and synced with the clinical network.",
    });
    
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="abhaId">Patient ABHA ID</Label>
          <Input id="abhaId" placeholder="ABHA-1000" required className="uppercase" />
          <p className="text-[10px] text-muted-foreground italic">Standard format: ABHA-XXXX</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter patient name" required />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="45" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="blood">Blood Group</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a+">A+</SelectItem>
              <SelectItem value="a-">A-</SelectItem>
              <SelectItem value="b+">B+</SelectItem>
              <SelectItem value="b-">B-</SelectItem>
              <SelectItem value="o+">O+</SelectItem>
              <SelectItem value="o-">O-</SelectItem>
              <SelectItem value="ab+">AB+</SelectItem>
              <SelectItem value="ab-">AB-</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Primary Clinical Diagnosis</Label>
        <Textarea placeholder="Describe the current medical condition and history..." className="min-h-[100px]" required />
      </div>

      <div className="space-y-2">
        <Label>Diagnostic Report Upload (PDF/DICOM)</Label>
        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer border-primary/20">
          <UploadCloud className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">Maximum file size: 20MB</p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Encrypted Sync...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            Commit Patient Record
          </>
        )}
      </Button>
    </form>
  );
}
