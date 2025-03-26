"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Vendor {
  id: number;
  username: string;
  email: string;
  password: string;
  status: string;
}

export default function VendorProfile() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Extract vendor ID
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const vendors: Vendor[] = JSON.parse(localStorage.getItem("vendors") || "[]");
    const foundVendor = vendors.find((v) => v.id === Number(id));

    if (!foundVendor) {
      router.push("/vendors/login");
      return;
    }

    setVendor(foundVendor);
    setUsername(foundVendor.username);
    setEmail(foundVendor.email);
    setPassword(foundVendor.password);
  }, [id, router]);

  const handleSave = () => {
    if (!vendor) return;

    const vendors: Vendor[] = JSON.parse(localStorage.getItem("vendors") || "[]");
    const updatedVendors = vendors.map((v) =>
      v.id === vendor.id ? { ...v, username, email, password } : v
    );

    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    alert("Profile updated successfully!");
    router.push(`/vendors/${id}`);
  };

  if (!vendor) return <p className="text-center mt-10">Loading...</p>;

  return (
    <VendorLayout username={vendor.username} onSignOut={() => router.push("/vendors/login")}>
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-center">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
