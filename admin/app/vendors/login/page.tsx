"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VendorLayout from "@/components/VendorLayout";
import { toast } from "sonner"; // Import toast notifications

export default function VendorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    setError("");

    // Get vendors from localStorage
    const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");

    // Check if vendor exists
    const vendor = vendors.find((v: any) => v.email === email);

    if (!vendor) {
      toast.error("Vendor not registered. Redirecting to registration...");
      router.push("/vendors/register"); // Redirect to registration page
      return;
    }

    // Check if password matches
    if (vendor.password !== password) {
      setError("Invalid password");
      return;
    }

    // Check if vendor is approved
    if (vendor.status !== "approved") {
      setError("Your account is pending approval by admin.");
      return;
    }

    // Save the logged-in vendor
    localStorage.setItem("loggedInVendor", JSON.stringify(vendor));

    toast.success("Login successful! Redirecting...");
    router.push(`/vendors/${vendor.id}`); // Redirect to vendor dashboard
  };

  return (
    <VendorLayout username="Vendor" onSignOut={() => { router.push("/vendors/login") }}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Vendor Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleLogin} className="w-full">Login</Button>
            <p className="mt-2 text-sm">
              Don't have an account? <Link href="/vendors/register" className="text-blue-600">Register</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
