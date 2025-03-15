import { NextResponse } from "next/server";

// Temporary in-memory storage (Replace with a DB later)
let vendors: { username: string; email: string; password: string; status: string }[] = [];

export async function POST(req: Request) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    // Check if vendor already exists
    if (vendors.some((vendor) => vendor.email === email)) {
      return NextResponse.json({ message: "Vendor with this email already exists" }, { status: 400 });
    }

    // Store new vendor with "pending" status
    const newVendor = { username, email, password, status: "pending" };
    vendors.push(newVendor);

    return NextResponse.json({ message: "Registration successful! Await admin approval." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
