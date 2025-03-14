"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Vendor {
  id: number;
  name: string;
  email: string;
  status: string;
}

export default function VendorDashboard() {
  const { id } = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendors?id=${id}`);
        if (!response.ok) throw new Error("Vendor not found");

        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error(error);
        router.push("/switch"); // Redirect if vendor is not found
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVendor();
  }, [id, router]);

  if (loading) return <p className="text-center mt-10">Loading vendor data...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {vendor ? (
            <div className="space-y-4">
              <p className="text-lg font-semibold">{vendor.name}</p>
              <p className="text-sm text-gray-500">{vendor.email}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    vendor.status === "approved" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {vendor.status}
                </span>
              </p>
              <Button onClick={() => router.push("/switch")}>Switch Back to Admin</Button>
            </div>
          ) : (
            <p className="text-red-500">Vendor not found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
