import { NextRequest, NextResponse } from "next/server";

let vendors = [
  { id: 1, name: "Vendor One", email: "vendor1@example.com", status: "pending" },
  { id: 2, name: "Vendor Two", email: "vendor2@example.com", status: "approved" },
];

// GET: Fetch all vendors or a single vendor
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const vendor = vendors.find((v) => v.id === parseInt(id, 10));
    return vendor
      ? NextResponse.json(vendor)
      : NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  return NextResponse.json(vendors);
}

// POST: Add a new vendor
export async function POST(req: NextRequest) {
  const body = await req.json();
  const newVendor = { id: vendors.length + 1, ...body, status: "pending" };
  vendors.push(newVendor);
  return NextResponse.json({ message: "Vendor added", vendor: newVendor });
}

// PUT: Update vendor status
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  if (!id || !status) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  vendors = vendors.map((v) => (v.id === parseInt(id, 10) ? { ...v, status } : v));
  return NextResponse.json({ message: "Vendor updated", vendors });
}

// DELETE: Remove a vendor
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing vendor ID" }, { status: 400 });

  vendors = vendors.filter((v) => v.id !== parseInt(id, 10));
  return NextResponse.json({ message: "Vendor deleted", vendors });
}
