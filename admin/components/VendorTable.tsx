"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

interface Vendor {
  id: number;
  name: string;
  email: string;
  status: string;
}

export default function VendorTable() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vendors");
      const data = await response.json();
      setVendors(data);
    } catch {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  const approveVendor = async (id: number) => {
    try {
      await fetch(`/api/vendors?id=${id}&status=approved`, { method: "PUT" });
      toast.success("Vendor approved!");
      fetchVendors();
    } catch {
      toast.error("Failed to approve vendor");
    }
  };

  const deleteVendor = async (id: number) => {
    try {
      await fetch(`/api/vendors?id=${id}`, { method: "DELETE" });
      toast.success("Vendor deleted!");
      fetchVendors();
    } catch {
      toast.error("Failed to delete vendor");
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
          <p>Loading vendors...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => router.push(`/vendors/${vendor.id}`)}>View</Button>
                    <Button onClick={() => approveVendor(vendor.id)}>Approve</Button>
                    <Button variant="destructive" onClick={() => deleteVendor(vendor.id)}>Delete</Button>
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
