import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const categoriesFilePath = path.resolve(process.cwd(), 'categories.json');

// Helper function to get categories from file
const getCategories = () => {
  if (!fs.existsSync(categoriesFilePath)) {
    return [];
  }
  const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
  return categories;
};

// Helper function to save categories to file
interface Category {
  id: number;
  name: string;
}

const saveCategories = (categories: Category[]) => {
  fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2));
};
export  const runtime = "edge";
// **GET - Fetch all categories**
export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// **POST - Add a new category**
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const categories = getCategories();

    // Prevent duplicate category names
    if (categories.some((cat: Category) => cat.name.toLowerCase() === name.toLowerCase())) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    const newCategory = { id: Date.now(), name };
    categories.push(newCategory);
    saveCategories(categories);

    return NextResponse.json({ message: "Category added", category: newCategory });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
}

// **PUT - Update a category**
export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();
    const categories = getCategories();
    const index = categories.findIndex((cat: { id: number; name: string }) => cat.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    categories[index].name = name;
    saveCategories(categories);

    return NextResponse.json({ message: "Category updated", categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// **DELETE - Remove a category**
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    let categories = getCategories();
    categories = categories.filter((cat: Category) => cat.id !== id);
    saveCategories(categories);

    return NextResponse.json({ message: "Category deleted", categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
