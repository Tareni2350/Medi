import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, History, Settings, FileText, Bell, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
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
              <SidebarGroupLabel>Medical Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Clinical Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <Users className="w-4 h-4" />
                        <span>Patients</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <FileText className="w-4 h-4" />
                        <span>Diagnostics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>History & Logs</SidebarGroupLabel>
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
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
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
                DS
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-background/50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
