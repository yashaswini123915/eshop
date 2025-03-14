"use client";

import { useEffect, useState } from "react";
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
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Fetch all vendors
  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vendors");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single vendor by ID
  const viewVendorDetails = async (id: number) => {
    try {
      const response = await fetch(`/api/vendors?id=${id}`);
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setSelectedVendor(data);
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      toast.error("Failed to load vendor details");
    }
  };

  // Approve a vendor
  const approveVendor = async (id: number) => {
    try {
      const response = await fetch(`/api/vendors?id=${id}&status=approved`, { method: "PUT" });
      const data = await response.json();
      setVendors(data.vendors);
      toast.success("Vendor approved!");
    } catch (error) {
      console.error("Error approving vendor:", error);
      toast.error("Failed to approve vendor");
    }
  };

  // Delete a vendor
  const deleteVendor = async (id: number) => {
    try {
      const response = await fetch(`/api/vendors?id=${id}`, { method: "DELETE" });
      const data = await response.json();
      setVendors(data.vendors);
      toast.success("Vendor deleted!");
    } catch (error) {
      console.error("Error deleting vendor:", error);
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
          <>
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
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded ${
                          vendor.status === "approved" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button size="sm" onClick={() => viewVendorDetails(vendor.id)}>
                        View
                      </Button>
                      {vendor.status === "pending" && (
                        <Button size="sm" onClick={() => approveVendor(vendor.id)}>
                          Approve
                        </Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => deleteVendor(vendor.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Vendor Details Modal */}
            {selectedVendor && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Vendor Details</h2>
                  <p>
                    <strong>ID:</strong> {selectedVendor.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedVendor.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedVendor.email}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedVendor.status}
                  </p>
                  <Button className="mt-4" onClick={() => setSelectedVendor(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
