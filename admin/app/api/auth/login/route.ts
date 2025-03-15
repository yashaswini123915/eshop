import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Fetch vendors from local storage (Temporary, replace with DB later)
    let vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    
    // Check if vendor exists
    const vendor = vendors.find((v: any) => v.email === email && v.password === password);
    
    if (!vendor) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ 
      message: "Login successful", 
      vendor: { id: vendor.id, email: vendor.email, username: vendor.username }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
