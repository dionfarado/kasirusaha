"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Boxes,
  Command,
  Computer,
  Contact,
  Database,
  FileText,
  Frame,
  GalleryVerticalEnd,
  HardDriveDownload,
  HardDriveUpload,
  icons,
  Map,
  PackageCheck,
  PieChart,
  Settings,
  Settings2,
  Sparkles,
  SquareTerminal,
  Users,
  Wallet,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { title } from "process"
import { url } from "inspector"
import { Title } from "@radix-ui/react-dialog"
import { api } from "@/lib/api"

// This is sample data.
const data = {
  user: {
    name: "tes",
    email: "tes@aminiliator.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ADIDAS CORPORATE",
      logo: GalleryVerticalEnd,
      plan: "Perusahaan",
    },
   
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Tanya AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Produk",
      url: "#",
      icon: PackageCheck,
    },
    {
      title: "Kontak",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Pelanggan",
          url: "#",
        },
        {
          title: "Pemasok",
          url: "#",
        },
        {
          title: "Karyawan",
          url: "#",
        },
        {
          title: "Kategori Kontak",
          url: "#",
        },
      ],
    },
    {
      title: "Penjualan",
      url : "#",
      icon: HardDriveUpload
    },
    {
      title: "Pembelian",
      url : "#",
      icon: HardDriveDownload,
    },
    {
      title: "keuangan",
      url : "#",
      icon: Wallet,
      items : [
        {
          title : "Pengeluaran",
          url : "#"
        },
        {
          title : "Pemasukan",
          url : "#"
        },
        {
          title : "Transfer Kas/Bank",
          url : "#"
        },
        {
          title : "Hutang",
          url : "#"
        },
        {
          title : "Piutang",
          url : "#"
        },
        {
          title : "Kategori Keuangan",
          url : "#"
        },
        {
          title : "Akun Keuangan",
          url : "#"
        },
        {
          title : "Manual Jurnal",
          url : "#"
        },
        {
          title : "Pengecekan",
          url : "#"
        },
      ],
    },
    {
      title : "Kasir",
      url : "#",
      icon : Computer,
      items: [
        {
          title : "Akses",
          url : "#",
        },
        {
          title : "Metode Pembayaran",
          url : "#",
        },
        {
          title : "Mode Kasir",
          url : "#",
        },
        {
         title : "Laporan Shift",
         url : "#", 
        },
        {
          title : "Cetal Label Harga",
          url : "#",
        },
        {
          title : "Laporan Kasir",
          url : "#",
        },
        {
          title : "Pengaturan Print",
          url : "#",
        },
        {
          title : "Pengaturan kasir",
          url : "#",
        },
      ],
    },
    {
      title: "Data Master",
      url : "#",
      icon : Database,
      items : [
        {
          title : "Proyek",
          url : "#",
        },
        {
          title : "Kategori Produk",
          url : "#",
        },
        {
          title : "Outlet/Gudang",
          url :"#",
        },
        {
          title : "Satuan",
          url : "#",
        },
        {
          title : "Konveksi Satuan",
          url : "#",
        },
        {
          title : "Diskon",
          url : "#",
        },
        {
          title : "Pajak",
          url : "#",
        },
        {
          title : "Harga Ojek Online",
          url : "#",
        },
        {
          title : "File",
          url : "#",
        },
      ],
    },
    {
      title : "Persediaan",
      url : "#",
      icon : Boxes,
      items : [
        {
          title : "Stok Produk",
          url : "#",
        },
        {
          title : "Penyesuaian Stok",
          url : "#",
        },
        {
          title : "Pindah Gudang",
          url : "#",
        },
      ],
    },
    {
      title : "CRM",
      url : "#",
      icon : Contact,
      items : [
        {
          title : "Progam Loyalitas",
          url : "#",
        },
        {
          title : "Tingkatan Pelanggan",
          url : "#",
        },
        {
          title : "Point Pelanggan",
          url : "#",
        },
        {
          title : "Riwayat Poin",
          url : "#",
        },
      ],
    },
    {
      title : "Laporan",
      url : "#",
      icon : FileText,
      items : [
        {
          title : "Laba Rugi",
          url : "#",
        },
        {
          title : "Neraca",
          url : "#",
        },
        {
          title : "Laporan Penjualan",
          url : "#",
        },
        {
        title : "Penjualan Item",
        url : "#",
        },
        {
          title : "Penjualan Produk",
          url : "#",
        },
        {
          title : "Penjualan Pelanggan",
           url : "#",
        },
        {
          title : "Pengeluaran Kontak",
          url : "#",
        },
        {
          title : "HPP Produk",
          url : "#",
        },
        {
          title : "Riwayat Jurnal",
          url : "#",
        },
      ],
    },
    {
      title : "Pengaturan",
      url :"#",
      icon :  Settings,
    },
  ],
  
}

type DataActive = {
  name: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [dataActive, setDataActive] = React.useState<DataActive>();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api
    .get("/auth/organization/get-full-organization", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setDataActive(res.data);
      console.log(res.data);
    });

    api
    .get("/auth/get-session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.user);
      setUser(res.data.user);
    })
  },[]);

  const [activeButton, setActiveButton] = React.useState("ERP")

  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
         <div className="flex items-center gap-4 bg-gray-100 border-gray-200 rounded-md p-1 mt-2">
          <button 
          onClick={() => setActiveButton("ERP")}
          className={`text-sm w-1/2 py-[2px] font-medium cursor-pointer ${
            activeButton === "ERP"
            ? "bg-white border rounded-md shadow-sm"
            : ""
          }`}
          >
            ERP
          </button>
          <button
          onClick={() => setActiveButton("Work")}
          className={`text-sm w-1/2 py-[2px] font-medium cursor-pointer ${
            activeButton === "Work"
            ? "bg-white border rounded-md shadow-sm"
            : ""
          }`}
          >
            Workspace
            </button>
        </div> 
      </SidebarHeader>
      <SidebarContent>
        {activeButton === "ERP" && <NavMain items={data.navMain}/> }
        {activeButton === "Work" && (
          <div className="text-gray-800">Coming soon</div>
        )}
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || data.user} />
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  );

}
