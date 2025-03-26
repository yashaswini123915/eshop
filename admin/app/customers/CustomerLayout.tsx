"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
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
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push("/vendors/register")}>
            Become a Seller
          </Button>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
