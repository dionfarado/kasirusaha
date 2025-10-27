"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Clock, HandCoins, ShoppingCart, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { id } from "date-fns/locale";

import { api } from "@/lib/api";
import { DatePicker } from "./DataPicker";
import { datetimeRegex } from "zod/v3";
import { convertDate } from "./ConvertDate";

interface SalesData {
  date: string;
  total: number;
  count: number;
}

interface ChartData {
  time: string;
  value: number;
}

export default function ChartPenjualanHarian() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [averagePerHour, setAveragePerHour] = useState<number>(0);
  const [busiestHour, setBusiestHour] = useState<string>("=");
  const [averagePerTransaction, setAveragePerTransaction] = useState<number>(0);
  const date = convertDate(selectedDate!);

  const onChanges = (selectDate: Date | undefined) => {
    setSelectedDate(selectDate);
  };

  useEffect(() => {
    api
      .get(`dashboards/sales_amount_chart?filter=${date}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("res", res);
        console.log("isi", res.data);
        const rawData: SalesData[] = res.data;
        console.log("data", rawData);
        if (rawData.length === 0) {
          setChartData([]);
          setTotalSales(0);
          setTotalTransactions(0);
          setAveragePerHour(0);
          setAveragePerTransaction(0);
          setBusiestHour("--:--");
          return;
        }

        const transformed: ChartData[] = rawData.map((item) => {
          const d = new Date(item.date);
          const time = d.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return { time, value: item.total };
        });

        const totalSales = rawData.reduce((acc, curr) => acc + curr.total, 0);
        const totalTransactions = rawData.reduce(
          (acc, curr) => acc + curr.count,
          0
        );
        const hourActive = rawData.length;
        const averagePerHour = totalSales / hourActive;
        const averagePerTransaction =
          totalTransactions > 0 ? totalSales / totalTransactions : 0;

        const busiest = rawData.reduce((prev, curr) =>
          curr.total > prev.total ? curr : prev
        );
        const busiestTime = new Date(busiest.date).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setChartData(transformed);
        setTotalSales(totalSales);
        setTotalTransactions(totalTransactions);
        setAveragePerHour(averagePerHour);
        setAveragePerTransaction(averagePerTransaction);
        setBusiestHour(busiestTime);
      })
      .catch((err) => console.error("Chart error:", err));
  }, [date]);

  return (
    <div className="bg-white shadow border rounded-xl px-3 sm:px-5 mb-4 mt-3 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 my-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">
            Penjualan Per Hari
          </h2>
          <p className="text-sm text-gray-500">
            {selectedDate
              ? format(selectedDate, "dd MMM yyyy", { locale: id })
              : "Pilih tanggal"}
          </p>
        </div>
        <DatePicker onChange={onChanges} />
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Total Penjualan */}
        <div className="rounded-md border p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-green-50">
          <div className="flex items-center sm:flex-row gap-2">
            <HandCoins className="text-green-500" size={20} />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                Total Penjualan
              </p>
              <h3 className="text-base sm:text-xl font-bold text-green-600">
                {totalSales.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="rounded-md border p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-blue-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-500" size={20} />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                Total Transaksi
              </p>
              <h3 className="text-base sm:text-xl font-bold text-blue-600">
                {totalTransactions}
              </h3>
            </div>
          </div>
        </div>

        {/* Rata-rata / jam */}
        <div className="rounded-md border p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-purple-50">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-purple-500" size={20} />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                Rata-rata / Jam
              </p>
              <h3 className="text-base sm:text-xl font-bold text-purple-600">
                {averagePerHour.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
        </div>

        {/* Jam Tersibuk */}
        <div className="rounded-md border p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-orange-50">
          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" size={20} />
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Jam Tersibuk</p>
              <h3 className="text-base sm:text-xl font-bold text-orange-600">
                {busiestHour}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="none"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#687280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6B7280" }}
            />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(value)
              }
              cursor={false}
            />
            <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-gray-600 border-t mt-4 pt-3 gap-1 sm:gap-0">
        <p>
          Rata-rata{" "}
          {averagePerTransaction.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}{" "}
          per transaksi
        </p>
        <p className="text-blue-600">{chartData.length} jam aktif</p>
      </div>
    </div>
  );
}
