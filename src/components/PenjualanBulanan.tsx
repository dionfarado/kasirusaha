"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HandCoins,
  ShoppingCart,
  SquareArrowOutUpRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type ChartDataItem = {
  date: string;
  price: number;
};

type SalesDataItem = {
  date: string;
  total: number;
  count: number;
};

function generateDateRangeQuery() {
  const start = "2025-10-01";
  const end = "2025-10-31";
  return `from=${start}&to=${end}`;
}

export default function PenjualanBulanIni() {
  const [range, setRange] = useState("");
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [rataRata, setRataRata] = useState(0);

  useEffect(() => {
    setRange(generateDateRangeQuery());
  }, []);

  useEffect(() => {
    if (!range) return;

    const fetchData = async () => {
      try {
        const res = await api.get<SalesDataItem[]>(
          `dashboards/sales_amount_chart?${range}&filter=`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );

        const apiData = res.data || [];

        const formattedChartData: ChartDataItem[] = apiData.map((item) => ({
          date: new Date(item.date).getDate() + " Okt",
          price: item.total,
        }));

        setChartData(formattedChartData);

        const totalPenjualanVal = apiData.reduce(
          (sum, item) => sum + item.total,
          0
        );
        const totalTransaksiVal = apiData.reduce(
          (sum, item) => sum + item.count,
          0
        );
        const dayWithSales = apiData.filter((item) => item.total > 0).length;
        const rataRataVal =
          dayWithSales > 0 ? totalPenjualanVal / dayWithSales : 0;

        setTotalPenjualan(totalPenjualanVal);
        setTotalTransaksi(totalTransaksiVal);
        setRataRata(rataRataVal);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    fetchData();
  }, [range]);

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2">
        <div>
          <CardTitle className="text-sm sm:text-lg font-semibold">
            Penjualan Bulan Ini
          </CardTitle>
          <p className="text-xs text-gray-500">1 Okt 2025 - 31 Okt 2025</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs sm:text-sm text-gray-500"
        >
          Lihat lainnya <SquareArrowOutUpRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>

      <CardContent>
        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {/* Total Penjualan */}
          <div className="rounded-md border p-3 bg-green-50 flex flex-row items-center gap-2">
            <HandCoins className="text-green-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Total Penjualan</p>
              <h3 className="text-base sm:text-lg font-bold text-green-500">
                Rp {totalPenjualan.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>

          {/* Total Transaksi */}
          <div className="rounded-md border p-3 bg-blue-50 flex flex-row items-center gap-2">
            <ShoppingCart className="text-blue-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Total Transaksi</p>
              <h3 className="text-base sm:text-lg font-bold text-blue-500">
                {totalTransaksi}
              </h3>
            </div>
          </div>

          {/* Rata-rata */}
          <div className="rounded-md border p-3 bg-purple-50 flex flex-row items-center gap-2">
            <TrendingUp className="text-purple-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Rata-rata/Hari</p>
              <h3 className="text-base sm:text-lg font-bold text-purple-500">
                Rp {rataRata.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-48 sm:h-56 overflow-x-auto">
          {/* Tambahin min-width agar di mobile bisa scroll */}
          <div className="min-w-[400px] h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
              >
                <Line
                  type="linear"
                  dataKey="price"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#e76e50" }}
                />
                <CartesianGrid
                  stroke="#E5E7EB"
                  strokeDasharray="3 3"
                  vertical={false}
                  horizontal={true}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#4A4A4A" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value / 1000} rb`}
                  tick={{ fontSize: 11, fill: "#4A4A4A" }}
                />
                <Tooltip
                  formatter={(value) => [
                    `Rp ${(value as number).toLocaleString("id-ID")}`,
                    "Total",
                  ]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
