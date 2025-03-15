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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null); // Track button loading state

  // Fetch vendors from the API
  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/vendors");

      if (!response.ok) throw new Error("Failed to fetch vendors");

      const data = await response.json();
      setVendors(Array.isArray(data.vendors) ? data.vendors : []);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setError("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  // Handle vendor actions (approve/delete)
  const handleVendorAction = async (id: number, action: "approve" | "delete") => {
    setActionLoading(id);
    try {
      const response = await fetch("/api/vendors", {
        method: "POST",
        body: JSON.stringify({ id, action }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Action failed");

      toast.success(data.message);
      fetchVendors(); // Refresh vendor list
    } catch (error) {
      console.error(`Error ${action} vendor:`, error);
      toast.error(`Failed to ${action} vendor`);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Loading vendors...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
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
                    <Button size="sm" onClick={() => router.push(`/vendors/${vendor.id}`)}>View</Button>
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
