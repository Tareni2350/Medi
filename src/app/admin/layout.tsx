
'use client';

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, UserPlus, FileUp, Settings, Bell, Search, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Admin Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin"
    },
    {
      name: "Register Patient",
      href: "#",
      icon: UserPlus,
      active: false
    },
    {
      name: "Bulk Upload",
      href: "#",
      icon: FileUp,
      active: false
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <ShieldCheck className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground leading-none">MediSync AI</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">Hospital Admin</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
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
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <Settings className="w-4 h-4" />
                        <span>Facility Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-destructive">
                      <Link href="/">
                        <LogOut className="w-4 h-4" />
                        <span>Exit Portal</span>
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
                  placeholder="Search records or facilities..." 
                  className="bg-transparent border-none text-sm focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </Button>
              <div className="flex items-center gap-3 pl-2 border-l">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold leading-none">Admin User</p>
                  <p className="text-[10px] text-muted-foreground">General Hospital #402</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  AD
                </div>
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
