"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type TopProduct = {
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
};

function generateDateRangeQuery() {
  const start = "2025-10-01";
  const end = "2025-10-31";
  return `from=${start}&to=${end}`;
}

export default function ProdukTerlaris() {
  const [range, setRange] = useState("");
  const [dataSales, setDataSales] = useState<TopProduct[]>([
    // 🧩 Data default (ditampilkan sebelum API merespons)
   
  ]);

  useEffect(() => {
    setRange(generateDateRangeQuery());
  }, []);

  useEffect(() => {
    if (!range) return;

    const fetchData = async () => {
      try {
        const res = await api.get(`dashboards/top_products?${range}&filter=`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("📦 Data Produk Terlaris:", res.data);

        // Pastikan API mengembalikan array
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDataSales(res.data);
        }
      } catch (error) {
        console.error("Gagal memuat produk terlaris:", error);
      }
    };

    fetchData();
  }, [range]);

  return (
    <Card className="shadow-sm border border-gray-200 sm:w-1/2 w-full mt-4 sm:mt-0">
      <CardHeader className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2">
        <CardTitle>Produk Terlaris</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm text-gray-500">
          Lihat semua <SquareArrowOutUpRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {[...dataSales]
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-gray-50 hover:bg-gray-100 p-3 transition"
              >
                {/* Kiri: Avatar + Info produk */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    </div>
                    {index === 0 && (
                      <span className="absolute -top-2 -left-2 text-[10px] font-semibold bg-yellow-400 text-white px-2 py-0.5 rounded-full shadow">
                        #1
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{item.productName}</p>
                    <p className="text-xs text-gray-500">
                      {item.totalQuantity} units
                    </p>
                  </div>
                </div>

                <div className="text-sm text-green-600 font-semibold">
                  Rp {item.totalRevenue.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}