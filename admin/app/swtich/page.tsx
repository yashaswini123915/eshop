"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const vendors = [
  { id: 1, name: "Vendor A", email: "vendorA@example.com" },
  { id: 2, name: "Vendor B", email: "vendorB@example.com" },
  { id: 3, name: "Vendor C", email: "vendorC@example.com" },
];

export default function SwitchPage() {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);

  const handleSwitch = (vendorId: number) => {
    setSelectedVendor(vendorId);
    // Redirect to the vendor dashboard
    router.push(`/vendor/${vendorId}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Switch to Vendor Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className={`p-4 border rounded-lg flex justify-between items-center ${
                  selectedVendor === vendor.id ? "bg-gray-100" : ""
                }`}
              >
                <div>
                  <p className="text-lg font-medium">{vendor.name}</p>
                  <p className="text-sm text-gray-500">{vendor.email}</p>
                </div>
                <Button onClick={() => handleSwitch(vendor.id)}>Switch</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
