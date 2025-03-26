import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Function to get stored products
async function getStoredProducts() {
  const cookieStore = cookies();
  const products = cookieStore.get("products")?.value;
  return products ? JSON.parse(products) : [];
}

// Function to save products
async function saveProducts(products: any[]) {
  const cookieStore = cookies();
  cookieStore.set("products", JSON.stringify(products), { path: "/" });
}

// **GET - Fetch all products**
export async function GET() {
  try {
    const products = await getStoredProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// **POST - Add a new product**
export async function POST(req: Request) {
  try {
    const newProduct = await req.json();
    let products = await getStoredProducts();
    newProduct.id = Date.now(); // Unique ID for new product
    products.push(newProduct);
    await saveProducts(products);
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

// **PUT - Update a product**
export async function PUT(req: Request) {
  try {
    const updatedProduct = await req.json();
    let products = await getStoredProducts();
    products = products.map((p: any) => (p.id === updatedProduct.id ? updatedProduct : p));
    await saveProducts(products);
    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// **DELETE - Remove a product**
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    let products = await getStoredProducts();
    products = products.filter((p: any) => p.id !== id);
    await saveProducts(products);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
