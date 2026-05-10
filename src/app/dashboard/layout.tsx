'use client';

import { Suspense } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, History, Settings, FileText, Bell, Search, ShieldCheck, ChevronRight, Loader2, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { patients_df } from "@/lib/mock-data";

function DashboardInnerLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const abhaId = searchParams.get('abhaId');

  const navigationItems = [
    {
      name: "Clinical Overview",
      href: `/dashboard${abhaId ? `?abhaId=${abhaId}` : ''}`,
      icon: LayoutDashboard,
      active: pathname === "/dashboard"
    },
    {
      name: "Diagnostics",
      href: `/dashboard/diagnostics${abhaId ? `?abhaId=${abhaId}` : ''}`,
      icon: FileText,
      active: pathname === "/dashboard/diagnostics"
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar className="border-r border-border/50">
        <SidebarHeader className="p-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-foreground">MediSync AI</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={item.active}>
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Recent Patient Records</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {patients_df.map((patient) => (
                  <SidebarMenuItem key={patient.abhaId}>
                    <SidebarMenuButton asChild isActive={abhaId === patient.abhaId} className="h-12">
                      <Link href={`${pathname}?abhaId=${patient.abhaId}`} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col items-start overflow-hidden text-left">
                          <span className="text-sm font-medium truncate w-full">{patient.name}</span>
                          <span className="text-[10px] text-muted-foreground truncate w-full">{patient.abhaId}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="text-primary font-medium">
                    <Link href="/" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Search All Patients</span>
                      <ChevronRight className="w-3 h-3 ml-auto" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <History className="w-4 h-4" />
                      <span>Integrations Log</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="hidden md:flex items-center bg-muted/50 rounded-full px-4 py-1.5 border gap-3 w-80">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Global search records..." 
                className="bg-transparent border-none text-sm focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              MS
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-background/50">
          {children}
        </main>
      </SidebarInset>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }>
        <DashboardInnerLayout>
          {children}
        </DashboardInnerLayout>
      </Suspense>
    </SidebarProvider>
  );
}
