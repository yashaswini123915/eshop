"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";

type Vendor = {
  id: number;
  name: string;
  allowed: boolean;
};

const Dashboard = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [totalVendors, setTotalVendors] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch vendors from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("/api/vendors");
        if (!res.ok) throw new Error("Failed to fetch vendors");
        
        const data = await res.json();
        setVendors(data.vendors);
        setTotalVendors(data.total);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleAllow = (id: number) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === id ? { ...vendor, allowed: !vendor.allowed } : vendor
      )
    );
  };

  const handleDelete = (id: number) => {
    setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
    setTotalVendors((prev) => prev - 1); // Update total count on delete
  };
 
  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
      <main className="p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <Card className="shadow-lg mb-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Vendors: {loading ? "Loading..." : totalVendors}</h2>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-4">Vendors</h2>
            {loading ? (
              <p>Loading vendors...</p>
            ) : vendors.length === 0 ? (
              <p className="text-gray-500">No vendors available.</p>
            ) : (
              vendors.map((vendor) => (
                <div key={vendor.id} className="flex justify-between items-center py-3 border-b last:border-none">
                  <span className="text-lg font-medium">{vendor.name}</span>
                  <div>
                    <Button
                      variant={vendor.allowed ? "destructive" : "default"}
                      onClick={() => handleAllow(vendor.id)}
                      className="mr-2"
                    >
                      {vendor.allowed ? "Disallow" : "Allow"}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(vendor.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </div>
    </AdminLayout>
  );
};

export default Dashboard;
export  const runtime = "edge";
