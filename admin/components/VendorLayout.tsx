"use client";

import { ReactNode } from "react";
import VendorNavbar from "@/components/VendorNavbar";
import VendorSidebar from "@/components/VendorSidebar";

interface VendorLayoutProps {
  children: ReactNode;
  username: string;
  onSignOut: () => void;
}

export default function VendorLayout({ children, username, onSignOut }: VendorLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <VendorNavbar username={username} onSignOut={onSignOut} />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
