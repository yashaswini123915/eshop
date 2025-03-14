import { NextResponse } from "next/server";

let categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
];

//  GET - Fetch all categories
export async function GET() {
  return NextResponse.json(categories);
}

//  POST - Add a new category
export async function POST(req: Request) {
  const newCategory = await req.json();
  const category = { id: categories.length + 1, ...newCategory };
  categories.push(category);

  return NextResponse.json({ message: "Category added", category });
}

//  PUT - Update a category (Use Query Params: ?id=1)
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  const updatedData = await req.json();

  const categoryIndex = categories.findIndex((c) => c.id === id);
  if (categoryIndex === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  categories[categoryIndex] = { ...categories[categoryIndex], ...updatedData };
  return NextResponse.json({ message: "Category updated", categories });
}

// DELETE - Remove a category (Use Query Param: ?id=1)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");

  const categoryIndex = categories.findIndex((c) => c.id === id);
  if (categoryIndex === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  categories = categories.filter((c) => c.id !== id);
  return NextResponse.json({ message: "Category deleted", categories });
}
