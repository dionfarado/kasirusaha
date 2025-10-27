"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type CompanyProps = {
  name: string;
  id: string;
};

export default function Perusahaan() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleCompanySelect = (value: string) => {
    setSelectedCompany(value);
  };

  async function getData() {
    try {
      const token = localStorage.getItem("accesstoken");
      const response = await api.get("/auth/organization/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(response.data);
    } catch (error) {
      console.error("Terjadi error saat mengambil data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleContinue = async () => {
    if (!selectedCompany) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/auth/organization/set-active",
        { organizationId: selectedCompany }, // kirim ID, bukan nama
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      push("/dashboard");
    } catch (error) {
      console.error("Terjadi error:", error);
    } finally {
      setLoading(false);
    }
  };

  // cari nama perusahaan berdasarkan ID yang dipilih
  const selectedCompanyName =
    companies.find((c) => c.id === selectedCompany)?.name || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-md">
        <h2 className="text-gray-800 font-semibold leading-none tracking-tight">
          Pilih perusahaan
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Silakan pilih perusahaan yang ingin Anda akses
        </p>

        <div className="space-y-4">
          <label className="text-sm font-medium">Perusahaan</label>
          <Select onValueChange={handleCompanySelect} value={selectedCompany}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih perusahaan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {selectedCompany && (
            <div className="mt-4 border rounded-md p-4 bg-gray-50">
              <h3 className="font-medium">{selectedCompanyName}</h3>
            </div>
          )}
        </div>

        <div className="relative flex justify-between items-center mt-4">
          <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Buat Perusahaan Baru
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedCompany || loading}
            className={`px-5 py-2 rounded-sm text-sm font-medium text-white ${
              selectedCompany
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-500 hover:bg-gray-500"
            }`}
          >
            {loading ? "Memproses..." : "Lanjutkan"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Tidak menemukan perusahaan Anda?{" "}
        <a href="#" className="text-gray-600 hover:underline">
          Hubungi dukungan kami
        </a>
      </div>
    </div>
  );
}
