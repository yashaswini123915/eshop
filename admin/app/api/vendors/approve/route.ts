import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public/vendors.json");

interface Vendor {
  id: number;
  username: string;
  email: string;
  status: string;
  approvedAt?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (id === undefined || id === null) {
      return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });
    }

    // Read vendors.json file
    const data = await fs.readFile(filePath, "utf-8");
    let vendors: Vendor[];
    try {
      vendors = JSON.parse(data);
    } catch {
      return NextResponse.json({ error: "Failed to parse vendors data" }, { status: 500 });
    }

    if (!Array.isArray(vendors)) {
      return NextResponse.json({ error: "Invalid vendors data format" }, { status: 500 });
    }

    // Convert `id` to a number before comparing
    const vendorIndex: number = vendors.findIndex((v) => v.id === Number(id));

    if (vendorIndex === -1) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Approve vendor
    vendors[vendorIndex] = {
      ...vendors[vendorIndex],
      status: "approved",
      approvedAt: new Date().toISOString(),
    };

    // Save updated vendors list
    await fs.writeFile(filePath, JSON.stringify(vendors, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Vendor approved successfully", vendor: vendors[vendorIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error approving vendor:", error);
    return NextResponse.json({ error: "Approval failed" }, { status: 500 });
  }
}
