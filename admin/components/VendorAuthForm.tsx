"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VendorLayout from "@/components/VendorLayout";

interface VendorAuthFormProps {
  type: "login" | "register"; // Determines form type
}
export  const runtime = "edge";
export default function VendorAuthForm({ type }: VendorAuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");

    if (type === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const existingVendor = vendors.find((v: { email: string }) => v.email === formData.email);
      if (existingVendor) {
        setError("Vendor with this email already exists");
        return;
      }

      const newVendor = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        status: "pending",
      };

      localStorage.setItem("vendors", JSON.stringify([...vendors, newVendor]));
      alert("Registration successful! Waiting for admin approval.");
      router.push("/vendors/login");
    } else {
      // Login
      const vendor = vendors.find(
        (v: { email: string; password: string }) => v.email === formData.email && v.password === formData.password
      );

      if (!vendor) {
        setError("Invalid credentials");
        return;
      }

      if (vendor.status !== "approved") {
        alert("Your account is pending admin approval.");
        return;
      }

      localStorage.setItem("loggedInVendor", JSON.stringify(vendor));
      router.push(`/vendors/${vendor.id}`);
    }
  };

  return (
       <VendorLayout username={formData.username} onSignOut={() => {}}>
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            {type === "register" ? "Vendor Registration" : "Vendor Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <Input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {type === "register" && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              {type === "register" ? "Register" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </VendorLayout>
  );
}
