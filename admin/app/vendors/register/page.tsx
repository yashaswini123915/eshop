"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Vendor {
  id: number;
  username: string;
  email: string;
  status: string;
}
export  const runtime = "edge";
export default function VendorRegistration() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    if (!username || !email) {
      toast.error("Please fill all fields");
      return;
    }

    // Get existing vendors from local storage
    const existingVendors: Vendor[] = JSON.parse(localStorage.getItem("vendors") || "[]");

    // Check if email already exists
    const isEmailTaken = existingVendors.some((vendor) => vendor.email === email);
    if (isEmailTaken) {
      toast.error("This email is already registered.");
      return;
    }

    // Create a new vendor
    const newVendor: Vendor = {
      id: Date.now(),
      username,
      email,
      status: "pending", // New vendors start as "pending"
    };

    // Update local storage
    const updatedVendors = [...existingVendors, newVendor];
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));

    toast.success("Registration successful! Waiting for approval.");

    // Redirect to vendor dashboard or login page
    router.push("/vendors");
  };

  return (
    <Card className="p-4 max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Vendor Registration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full" onClick={handleRegister}>
          Register
        </Button>
      </CardContent>
    </Card>
  );
}
