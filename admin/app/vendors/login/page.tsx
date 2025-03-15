"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VendorLayout from "@/components/VendorLayout";

export default function VendorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      router.push(`/vendors/${data.vendorId}`);
    } else {
      setError(data.message || "Invalid credentials");
    }
  };

  return (
    <VendorLayout username="Vendor" onSignOut={() => {router.push("/vendors/login")}}>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Vendor Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
          <Button onClick={handleLogin} className="w-full">Login</Button>
          Don't have an account? <Link href="/vendors/register" className="text-blue-600">Register</Link>
        </CardContent>
      </Card>
    </div>
    </VendorLayout>
  );
}
