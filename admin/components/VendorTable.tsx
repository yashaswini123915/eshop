"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

interface Vendor {
  id: number;
  username: string;
  email: string;
  status: string;
}

export default function VendorTable() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null); // Track button loading state

  // Fetch registered vendors from local storage
  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    setVendors(storedVendors);
    setLoading(false);
  }, []);

  // Save vendors to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  // Handle vendor actions (approve/delete)
  const handleVendorAction = (id: number, action: "approve" | "delete") => {
    setActionLoading(id);
    setTimeout(() => {
      let updatedVendors = [...vendors];

      if (action === "approve") {
        updatedVendors = updatedVendors.map((vendor) =>
          vendor.id === id ? { ...vendor, status: "approved" } : vendor
        );
        toast.success("Vendor approved");
      } else if (action === "delete") {
        updatedVendors = updatedVendors.filter((vendor) => vendor.id !== id);
        toast.success("Vendor deleted");
      }

      setVendors(updatedVendors);
      setActionLoading(null);
    }, 500);
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Loading vendors...</p>
        ) : vendors.length === 0 ? (
          <p className="text-center text-gray-500">No vendors available</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.username}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" onClick={() => router.push(`/vendors/${vendor.id}`)}>
                      View
                    </Button>
                    {vendor.status !== "approved" && (
                      <Button
                        size="sm"
                        disabled={actionLoading === vendor.id}
                        onClick={() => handleVendorAction(vendor.id, "approve")}
                      >
                        {actionLoading === vendor.id ? "Approving..." : "Approve"}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={actionLoading === vendor.id}
                      onClick={() => handleVendorAction(vendor.id, "delete")}
                    >
                      {actionLoading === vendor.id ? "Deleting..." : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
