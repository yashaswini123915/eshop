"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner"; // Import toast notifications

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    setError("");

    // Get customers from localStorage
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");

    // Check if customer exists
    const customer = customers.find((c: any) => c.email === email);

    if (!customer) {
      toast.error("Customer not registered. Redirecting to registration...");
      router.push("/customers/register"); // Redirect to registration page
      return;
    }

    // Check if password matches
    if (customer.password !== password) {
      setError("Invalid password");
      return;
    }

    // Save the logged-in customer
    localStorage.setItem("loggedInCustomer", JSON.stringify(customer));
    localStorage.setItem("isAuthenticated", "true"); // Mark as authenticated

    toast.success("Login successful! Redirecting...");
    router.push(`/customers/dashboard`); // Redirect to customer dashboard
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Customer Login</CardTitle>
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
            Don't have an account? <Link href="/customers/register" className="text-blue-600">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
