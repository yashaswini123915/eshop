"use client";

import VendorTable from "@/components/VendorTable";
import AdminLayout from "@/components/AdminLayout"
export  const runtime = "edge";
export default function VendorsPage() {
  return (
    <AdminLayout>
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
      <VendorTable />
    </div>
    </AdminLayout>
  );
}
