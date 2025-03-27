"use client";

import Link from "next/link";
import { Home, Package, ShoppingCart, LogOut } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
export  const runtime = "edge";
export default function VendorSidebar() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Get vendor ID

  const handleLogout = () => {
    localStorage.removeItem("vendorAuth");
    router.push("/vendors/login");
  };

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <nav className="space-y-4">
        <Link href={`/vendors/${id}/dashboard`} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href={`/vendors/${id}/products`} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md">
          <Package size={20} />
          <span>Products</span>
        </Link>
        <Link href={`/vendors/${id}/orders`} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md">
          <ShoppingCart size={20} />
          <span>Orders</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md text-red-600"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
