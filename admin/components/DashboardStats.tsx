"use client";

import { useEffect, useState } from "react";
//mport AdminLayout from "./AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Stats = {
  totalVendors: number;
  totalProducts: number;
  totalCategories: number;
  allowedVendors: number;
  disallowedVendors: number;
};

const DashboardStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchStats = () => {
        try {
          const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
          const products = JSON.parse(localStorage.getItem("products") || "[]");
          const categories = JSON.parse(localStorage.getItem("categories") || "[]");

          const allowedVendors = vendors.filter(
            (vendor: { allowed: boolean }) => vendor.allowed
          ).length;
          const disallowedVendors = vendors.length - allowedVendors;

          setStats({
            totalVendors: vendors.length,
            totalProducts: products.length,
            totalCategories: categories.length,
            allowedVendors,
            disallowedVendors,
          });
        } catch (err) {
          console.error("Error fetching stats:", err);
          setError("Failed to load stats. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
      window.addEventListener("storage", fetchStats);

      return () => {
        window.removeEventListener("storage", fetchStats);
      };
    }
  }, []);

  if (!stats) {
    return <p className="text-gray-500">Loading stats...</p>;
  }

  const barChartData = [
    { name: "Vendors", value: stats.totalVendors },
    { name: "Products", value: stats.totalProducts },
    { name: "Categories", value: stats.totalCategories },
  ];

  const pieChartData = [
    { name: "Allowed", value: stats.allowedVendors, color: "#4CAF50" },
    { name: "Disallowed", value: stats.disallowedVendors, color: "#F44336" },
  ];

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {error && <p className="text-red-500">{error}</p>}

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Total Vendors</h2>
          <p className="text-2xl font-bold">{loading ? "Loading..." : stats.totalVendors}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{loading ? "Loading..." : stats.totalProducts}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Total Categories</h2>
          <p className="text-2xl font-bold">{loading ? "Loading..." : stats.totalCategories}</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vendors vs Products</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vendor Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={80}>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    
  );
};

export default DashboardStats;
