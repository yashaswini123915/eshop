"use client";

//import { useRouter } from "next/navigation";
//mport { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VendorNavbarProps {
  username: string;
  onSignOut: () => void;
}
export  const runtime = "edge";
export default function VendorNavbar({ username }: VendorNavbarProps) {

  return (
    <nav className={cn("bg-white shadow-md p-4 flex justify-between items-center")}>
      <h1 className="text-lg font-semibold">Vendor Panel</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Hello, {username}</span>
      </div>
    </nav>
  );
}
