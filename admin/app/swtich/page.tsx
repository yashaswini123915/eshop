"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SwitchPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 text-center">
      <h1 className="text-2xl font-bold">Switch Dashboard</h1>
      <p className="mt-2 text-gray-600">Choose your role</p>

      <div className="mt-6 space-y-4">
        <Button onClick={() => router.push("/vendors/1")}>Go to Vendor Dashboard</Button>
        <Button variant="outline" onClick={() => router.push("./")}>
          Go to Admin Panel
        </Button>
      </div>
    </div>
  );
}
