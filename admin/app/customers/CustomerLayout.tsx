"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("loggedInCustomer") || "null");
    setCustomer(storedCustomer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInCustomer");
    localStorage.removeItem("isAuthenticated");
    setCustomer(null);
    router.push("/customers/home"); // Redirect to Home Page after logout
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          MyStore 🛍️
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button type="submit">Search</Button>
        </form>

        {/* Navigation Buttons */}
        <div className="flex gap-3 items-center">
          <Button variant="outline" onClick={() => router.push("/vendors/register")}>
            Become a Seller
          </Button>

          {customer ? (
            <>
              <span className="text-lg font-medium">{customer.username}</span>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/customers/login")}>Login</Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
