import { NextResponse } from "next/server";
export  const runtime = "edge";
export async function GET() {
  try {
    // Read from localStorage (Note: localStorage is not available in Next.js server)
    const vendors = JSON.parse(globalThis.localStorage?.getItem("vendors") || "[]");
    const products = JSON.parse(globalThis.localStorage?.getItem("products") || "[]");
    const categories = JSON.parse(globalThis.localStorage?.getItem("categories") || "[]");

    const allowedVendors = vendors.filter((vendor: { allowed: boolean }) => vendor.allowed).length;
    const disallowedVendors = vendors.length - allowedVendors;

    return NextResponse.json({
      totalVendors: vendors.length,
      totalProducts: products.length,
      totalCategories: categories.length,
      allowedVendors,
      disallowedVendors,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
