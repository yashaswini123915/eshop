import { NextResponse } from "next/server";

// Dummy Vendor Data (Replace with Database Later)
let vendors = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "approved" },
  { id: 3, name: "Vendor C", email: "vendorC@example.com", status: "approved" },
];

//  GET: Fetch All Vendors or a Single Vendor by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");

  if (id) {
    const vendor = vendors.find((v) => v.id === id);
    if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

    return NextResponse.json(vendor);
  }

  return NextResponse.json(vendors);
}

//  POST: Add a New Vendor
export async function POST(req: Request) {
  const newVendor = await req.json();
  if (!newVendor.name || !newVendor.email) {
    return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });
  }

  const vendor = { id: vendors.length + 1, ...newVendor, status: "pending" };
  vendors.push(vendor);
  return NextResponse.json({ message: "Vendor added", vendor });
}

//  PUT: Update Vendor Status (?id=1&status=approved)
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  const status = searchParams.get("status") || "pending";

  let vendor = vendors.find((v) => v.id === id);
  if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

  vendor.status = status;
  return NextResponse.json({ message: "Vendor updated", vendor });
}

// DELETE: Remove a Vendor (?id=1)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");

  vendors = vendors.filter((v) => v.id !== id);
  return NextResponse.json({ message: "Vendor deleted", vendors });
}
