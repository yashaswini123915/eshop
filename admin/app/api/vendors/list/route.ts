import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "vendors.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const vendors = JSON.parse(data);
    return NextResponse.json({ vendors }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 });
  }
}
