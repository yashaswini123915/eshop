"use client";

import VendorTable from "@/components/VendorTable";

export default function VendorsPage() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
      <VendorTable />
    </div>
  );
}
