"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, List, Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "./DashboardStats", label: "DashboardStats", icon: <Package className="w-5 h-5" /> },
  { href: "./products", label: "Products", icon: <Package className="w-5 h-5" /> },
  { href: "./categories", label: "Categories", icon: <List className="w-5 h-5" /> },
  { href: "./vendors", label: "Vendors", icon: <Users className="w-5 h-5" /> },
  { href: "./swtich", label: "Swtich Account", icon: <RefreshCw className="w-5 h-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex-1">
        {sidebarLinks.map(({ href, label, icon }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mb-2",
                pathname === href && "bg-gray-800"
              )}
            >
              {icon}
              <span className="ml-3">{label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
