import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear authentication session (in a real app, this could involve clearing cookies or JWT tokens)
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
