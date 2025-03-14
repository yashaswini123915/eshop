"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import Sidebar from "@/components/Sidebar"; // Uncomment when Sidebar is available

type Vendor = {
  id: number;
  name: string;
  allowed: boolean;
};

const Dashboard = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  // Load vendors from localStorage on mount
  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("vendors") || "[]") as Vendor[];
    setVendors(storedVendors);
  }, []);

  // Allow/Disallow Vendor
  const handleAllow = (id: number) => {
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === id ? { ...vendor, allowed: !vendor.allowed } : vendor
    );
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
  };

  // Delete Vendor
  const handleDelete = (id: number) => {
    const updatedVendors = vendors.filter((vendor) => vendor.id !== id);
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar /> Uncomment when Sidebar is ready */}
      <main className="p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Vendors</h2>
            {vendors.length === 0 ? (
              <p className="text-gray-500">No vendors available.</p>
            ) : (
              vendors.map((vendor) => (
                <div key={vendor.id} className="flex justify-between items-center py-2 border-b">
                  <span className="text-lg">{vendor.name}</span>
                  <div>
                    <Button
                      variant={vendor.allowed ? "destructive" : "default"}
                      onClick={() => handleAllow(vendor.id)}
                    >
                      {vendor.allowed ? "Disallow" : "Allow"}
                    </Button>
                    <Button
                      variant="destructive"
                      className="ml-2"
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
  );
};

export default Dashboard;
