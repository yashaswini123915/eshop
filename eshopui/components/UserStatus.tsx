"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Using ShadCN UI button

export default function UserStatus() {
  const { data: session } = useSession();

  return (
    <div className="p-4 border rounded-md shadow-md flex justify-between items-center">
      {session ? (
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold">Welcome, {session.user?.name}!</p>
          <Button variant="destructive" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p className="text-lg">You are not logged in.</p>
          <Button   onClick={() => signIn()}>Sign In</Button>
        </div>
      )}
    </div>
  );
}
