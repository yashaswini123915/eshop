"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface Vendor {
  id: number;
  username: string;
  email: string;
  status: string;
}
export  const runtime = "edge";
export default function VendorDashboard() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Extract vendor ID
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const vendors: Vendor[] = JSON.parse(localStorage.getItem("vendors") || "[]");
    const foundVendor = vendors.find((v) => v.id === Number(id));

    if (!foundVendor) {
      router.push("/vendors/login"); // Redirect if vendor not found
    } else if (foundVendor.status !== "approved") {
      alert("Your account is pending admin approval.");
      router.push("/vendors/login"); // Redirect if vendor is not approved
    } else {
      setVendor(foundVendor);
      fetchVendorData(foundVendor.id);
    }
    setLoading(false);
  }, [id, router]);

  const fetchVendorData = (vendorId: number) => {
    const allProducts = JSON.parse(localStorage.getItem("vendorProducts") || "[]");
    const vendorProducts = allProducts.filter((p: any) => p.vendorId === vendorId);
    setProductsCount(vendorProducts.length);

    const allOrders = JSON.parse(localStorage.getItem("vendorOrders") || "[]");
    const vendorOrders = allOrders.filter((o: any) => o.vendorId === vendorId);
    setOrdersCount(vendorOrders.length);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!vendor) return null;

  return (
    <VendorLayout username={vendor.username} onSignOut={() => router.push("/vendors/login")}>
      <div className="flex flex-col items-center justify-center p-6 space-y-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Vendor Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">Welcome, {vendor.username}!</h2>
            <p className="text-gray-600">Manage your shop and products here.</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-gray-100">
                <h3 className="text-lg font-medium">Products</h3>
                <p className="text-xl font-bold">{productsCount}</p>
              </Card>
              <Card className="p-4 text-center bg-gray-100">
                <h3 className="text-lg font-medium">Orders</h3>
                <p className="text-xl font-bold">{ordersCount}</p>
              </Card>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Button onClick={() => router.push(`/vendors/${id}/products`)} variant="default">
                Manage Products
              </Button>
              <Button onClick={() => router.push(`/vendors/${id}/orders`)} variant="outline">
                View Orders
              </Button>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
