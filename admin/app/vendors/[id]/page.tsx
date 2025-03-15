"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";

interface Vendor {
  id: number;
  username: string;
  email: string;
  status: string;
}

export default function VendorDashboard() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Extract vendor ID
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

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
    }
    setLoading(false);
  }, [id, router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!vendor) return null;

  return (
    <VendorLayout username={vendor.username} onSignOut={() => router.push("/vendors/login")}>
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-center">Vendor Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold">Welcome, {vendor.username}!</h2>
            <p className="text-gray-600">Manage your shop and products here.</p>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
