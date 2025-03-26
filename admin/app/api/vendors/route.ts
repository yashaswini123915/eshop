import { NextResponse } from "next/server";

// Helper function to get vendors from localStorage
const getVendors = () => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem("vendors") || "[]");
  }
  return [];
};

// Helper function to save vendors to localStorage
const saveVendors = (vendors: any) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }
};

// GET: Fetch all vendors
export async function GET() {
  try {
    const vendors = getVendors();
    return NextResponse.json({ success: true, vendors, total: vendors.length });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Approve or delete a vendor
export async function POST(req: Request) {
  try {
    const { id, action } = await req.json();
    let vendors = getVendors();

    if (!id || !["approve", "delete"].includes(action)) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    if (action === "approve") {
      vendors = vendors.map((vendor: any) =>
        vendor.id === id ? { ...vendor, status: "approved" } : vendor
      );
      saveVendors(vendors);
      return NextResponse.json({ success: true, message: "Vendor approved" });
    }

    if (action === "delete") {
      vendors = vendors.filter((vendor: any) => vendor.id !== id);
      saveVendors(vendors);
      return NextResponse.json({ success: true, message: "Vendor deleted" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
