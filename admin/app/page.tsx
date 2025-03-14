import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";

const Dashboard = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    setVendors(storedVendors);
  }, []);

  const handleAllow = (id: number) => {
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === id ? { ...vendor, allowed: !vendor.allowed } : vendor
    );
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
  };

  const handleDelete = (id: number) => {
    const updatedVendors = vendors.filter((vendor) => vendor.id !== id);
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Vendors</h2>
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex justify-between py-2">
                <span>{vendor.name}</span>
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
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
