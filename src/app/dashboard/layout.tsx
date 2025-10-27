"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import { UserMobile } from "@/components/user-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = {
    name: "Tes",
    email: "tes@mailinator.com",
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <div className="hidden lg:block">
          <AppSidebar />
          </div>
          <div className="w-full">
            <header className="flex h-12 items-center justify-between border-b px-4 lg:hidden sticky z-10 top-0 bg-white">
              <MobileSidebar dataActive={null} user={user} />
              <UserMobile user={user} />
            </header>

            <main className="flex-1 overflow-y-auto">
             {children}
            </main>
            </div>        
      </div>
    </SidebarProvider>
  )
}