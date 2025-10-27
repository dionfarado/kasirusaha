"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ChartPenjualanBulan from "@/components/PenjualanBulanan";
import ChartPenjualan from "@/components/PenjualanBulanan";
import PenjualanPerHari from "@/components/ChartPenjualanHarian";
import ProdukTerlaris from "@/components/Terlaris";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { RefreshFilter } from "@/components/Refresh-Filter";

export default function Page() {
  return (
    <div className="p-3">
      <div className="flex md:flex-row md:items-center justify-between gap-3 px-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <RefreshFilter />
        </div>
      </div>
      <SidebarInset>
        <div className=" gap-2">
          <PenjualanPerHari />

          <div className="flex gap-2 flex-col md:flex-row">
            <ChartPenjualanBulan />
            <ProdukTerlaris />
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}
