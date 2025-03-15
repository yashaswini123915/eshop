"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("vendor"); // Remove vendor session
      router.push("/vendors/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <Button onClick={handleLogout}>Sign Out</Button>;
}
