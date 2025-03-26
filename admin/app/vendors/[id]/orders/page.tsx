"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  customerName: string;
  items: string[];
  total: number;
  status: "pending" | "shipped" | "delivered";
  vendorId: number;
}

export default function VendorOrders() {
  const { id } = useParams<{ id: string }>(); // Vendor ID
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const vendorOrders = storedOrders.filter((order: Order) => order.vendorId === Number(id));
    setOrders(vendorOrders);
  }, [id]);

  const updateOrderStatus = (orderId: number, newStatus: "shipped" | "delivered") => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Orders Management</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p>Customer: {order.customerName}</p>
                <p>Items: {order.items.join(", ")}</p>
                <p>Total: ₹{order.total}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <div className="mt-2">
                  {order.status === "pending" && (
                    <Button onClick={() => updateOrderStatus(order.id, "shipped")}>
                      Mark as Shipped
                    </Button>
                  )}
                  {order.status === "shipped" && (
                    <Button onClick={() => updateOrderStatus(order.id, "delivered")}>
                      Mark as Delivered
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
