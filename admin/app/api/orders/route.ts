import { NextRequest, NextResponse } from "next/server";
export  const runtime = "edge";
// Fetch all orders (GET)
export async function GET() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  return NextResponse.json(orders);
}

// Update order status (PUT)
export async function PUT(req: NextRequest) {
  const { orderId, status } = await req.json();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  type Order = { id: string; status: string; [key: string]: string | number | boolean | object };
  const orderIndex = orders.findIndex((order: Order) => order.id === orderId);
  if (orderIndex === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  orders[orderIndex].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));

  return NextResponse.json({ message: "Order updated successfully" });
}
