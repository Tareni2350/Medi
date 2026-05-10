import { redirect } from 'next/navigation';
import { Search, ShieldCheck, Database, LayoutDashboard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from "next/link";

export default function Home() {
  async function handleSearch(formData: FormData) {
    'use server';
    const abhaId = formData.get('abhaId') as string;
    if (abhaId) {
      redirect(`/dashboard?abhaId=${abhaId}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <ShieldCheck className="w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground">MediSync AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Universal Healthcare Interoperability Platform. 
            Access fragmented records with a single ABHA ID.
          </p>
        </div>

        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="text-center">
            <CardTitle>Retrieve Integrated Patient History</CardTitle>
            <CardDescription>Enter the patient's ABHA ID to generate a centralized report</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSearch} className="flex gap-3 max-w-md mx-auto">
              <Input 
                name="abhaId" 
                placeholder="e.g. ABHA-1001" 
                className="flex-1 h-12 text-lg uppercase"
                required
              />
              <Button type="submit" size="lg" className="h-12 px-8">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </form>
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                <p>Demo IDs: <code className="bg-muted px-1 rounded">ABHA-1001</code>, <code className="bg-muted px-1 rounded">ABHA-1002</code>, <code className="bg-muted px-1 rounded">ABHA-1003</code></p>
              </div>
              <div className="h-px w-full bg-border max-w-xs" />
              <Button variant="outline" asChild size="sm" className="text-muted-foreground">
                <Link href="/admin">
                  <Lock className="w-3 h-3 mr-2" />
                  Hospital Administrator Portal
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Unified Records</h3>
            <p className="text-sm text-muted-foreground">Connects fragmented data from labs, hospitals, and pharmacies instantly.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Clinical Insights</h3>
            <p className="text-sm text-muted-foreground">Interactive diagnostic trends and longitudinal history visualization.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">ABHA Integrated</h3>
            <p className="text-sm text-muted-foreground">Standardized access following India's ABDM digital health infrastructure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
