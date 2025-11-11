"use client";

import * as React from "react";
import { api } from "@/lib/api";
import NavMain from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "@/components/Team-Switcher";
import {
  Boxes,
  Computer,
  Contact,
  Database,
  FileChartColumnIncreasing,
  HardDriveDownload,
  HardDriveUpload,
  icons,
  Package,
  Settings,
  Sparkles,
  SquareTerminal,
  Users,
  Wallet,
} from "lucide-react";

const data = {
  user: {
    name: "error",
    email: "error@error.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ADIDAS CORPORATE",
      logo: Package,
      plan: "Perusahaan",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Tanya AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Produk",
      url: "#",
      icon: Package,
    },
    {
      title: "Kontak",
      url: "#",
      icon: Users,
      items: [
        { title: "Pelanggan", url: "#" },
        { title: "Pemasok", url: "#" },
        { title: "Karyawan", url: "#" },
        { title: "Kategori Kontak", url: "#" },
      ],
    },
    {
      title: "Penjualan",
      url: "#",
      icon: HardDriveUpload,
    },
    {
      title: "Pembelian",
      url: "#",
      icon: HardDriveDownload,
    },
    {
      title: "Keuangan",
      url: "#",
      icon: Wallet,
      items: [
        { title: "Pengeluaran", url: "#" },
        { title: "Pemasukkan", url: "#" },
        { title: "Transfer Kas/Bank", url: "#" },
        { title: "Hutang", url: "#" },
        { title: "Piutang", url: "#" },
        { title: "Kategori Pengeluaran", url: "#" },
        { title: "Akun Keungan", url: "#" },
        { title: "Manual Jurnal", url: "#" },
        { title: "Pengecekan", url: "#" },
      ],
    },
    {
      title: "Kasir",
      url: "#",
      icon: Computer,
      items: [
        { title: "Akses", url: "#" },
        { title: "Metode Pembayaran", url: "#" },
        { title: "Mode Kasir", url: "#" },
        { title: "Laporan Shift", url: "#" },
        { title: "Cetak Label Harga", url: "#" },
        { title: "Laporan Kasir", url: "#" },
        { title: "Pengaturan Print", url: "#" },
        { title: "Pengaturan Kasir", url: "#" },
      ],
    },
    {
      title: "Data Master",
      url: "#",
      icon: Database,
      items: [
        { title: "Proyek", url: "#" },
        { title: "Kategori Produk", url: "#" },
        { title: "Outlet / Gudang", url: "#" },
        { title: "Satuan", url: "#" },
        { title: "Konversi Satuan", url: "#" },
        { title: "File", url: "#" },
        { title: "Diskon", url: "#" },
        { title: "Pajak", url: "#" },
      ],
    },
    {
      title: "Persediaan",
      url: "#",
      icon: Boxes,
      items: [
        { title: "Stok Produk", url: "#" },
        { title: "Penyesuaian Stok", url: "#" },
        { title: "Pindah Gudang", url: "#" },
      ],
    },
    {
      title: "CRM",
      url: "#",
      icon: Contact,
      items: [
        { title: "Progam Loyalitas", url: "#" },
        { title: "Tingkatan Pelanggan", url: "#" },
        { title: "Poin Pelanggan", url: "#" },
        { title: "Riwayat Poin", url: "#" },
      ],
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileChartColumnIncreasing,
      items: [
        { title: "Laba Rugi", url: "#" },
        { title: "Neraca", url: "#" },
        { title: "Laporan Penjualan", url: "#" },
        { title: "Penjualan Item", url: "#" },
        { title: "Penjualan Produk", url: "#" },
        { title: "Penjualan Pelanggan", url: "#" },
        { title: "Pengualaran Kontak", url: "#" },
        { title: "HPP Produk", url: "#" },
        { title: "Riwayat Jurnal", url: "#" },
      ],
    },
    {
      title: "Pengaturan",
      url: "#",
      icon: Settings,
    },
  ],
};

export default function SidebarInner() {
  const [dataActive, setDataActive] = React.useState<any>();
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/auth/organization/get-full-organization", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDataActive(res.data));

    api
      .get("/auth/get-session", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user));
  }, []);
  const [activeButton, setActiveButton] = React.useState("ERP");

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="p-4 border-b">
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
      </div>

      <div className="flex-1 overflow-y-auto">
        <NavMain items={data.navMain} />
      </div>

      <div className="border-t p-2">
        <NavUser user={user || data.user} />
      </div>
    </div>
  );
}
