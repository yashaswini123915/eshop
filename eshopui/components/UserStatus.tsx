"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserStatus() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="p-4 border rounded-lg shadow-md flex justify-between items-center bg-white">
      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold">Welcome, {user.username}!</p>
          <Button variant="destructive" onClick={logout}>Sign Out</Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p className="text-lg text-gray-700">You are not logged in.</p>
          <Button onClick={() => router.push("/login")}>Sign In</Button>
        </div>
      )}
    </div>
  );
}
