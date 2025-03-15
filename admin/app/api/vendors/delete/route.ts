import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "vendors.json");

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });

    const data = await fs.readFile(filePath, "utf-8");
    let vendors = JSON.parse(data);

    const vendorIndex = vendors.findIndex((v: any) => v.id === id);
    if (vendorIndex === -1) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

    vendors = vendors.filter((v: any) => v.id !== id);
    await fs.writeFile(filePath, JSON.stringify(vendors, null, 2));

    return NextResponse.json({ message: "Vendor deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
