import { NextResponse } from "next/server";

// Mock database (Replace this with actual database logic)
let vendors = [
  { id: 1, username: "Vendor1", email: "vendor1@example.com", status: "pending" },
  { id: 2, username: "Vendor2", email: "vendor2@example.com", status: "approved" },
];

// GET: Fetch all vendors
export async function GET() {
  try {
    return NextResponse.json({ success: true, vendors, total: vendors.length });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Approve a vendor
export async function POST(req: Request) {
  try {
    const { id, action } = await req.json();

    if (!id || !["approve", "delete"].includes(action)) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    if (action === "approve") {
      vendors = vendors.map((vendor) =>
        vendor.id === id ? { ...vendor, status: "approved" } : vendor
      );
      return NextResponse.json({ success: true, message: "Vendor approved" });
    }

    if (action === "delete") {
      vendors = vendors.filter((vendor) => vendor.id !== id);
      return NextResponse.json({ success: true, message: "Vendor deleted" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
