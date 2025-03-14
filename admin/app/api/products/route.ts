import { NextResponse } from "next/server";

let products = [
  { id: 1, name: "Product A", price: 100, category: "Electronics" },
  { id: 2, name: "Product B", price: 50, category: "Clothing" },
];

//  GET - Fetch all products
export async function GET() {
  return NextResponse.json(products);
}

//  POST - Add a new product
export async function POST(req: Request) {
  const newProduct = await req.json();
  const product = { id: Date.now(), ...newProduct };
  products.push(product);
  return NextResponse.json({ message: "Product added", product });
}

//  PUT - Update product (Use Query Param: ?id=1)
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  const updatedData = await req.json();

  let product = products.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  product = Object.assign(product, updatedData);
  return NextResponse.json({ message: "Product updated", product });
}

// DELETE - Remove a product (Use Query Param: ?id=1)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  products.splice(index, 1);
  return NextResponse.json({ message: "Product deleted" });
}
