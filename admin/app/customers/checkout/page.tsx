"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export  const runtime = "edge";
export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    setTotal(storedCart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0));
  }, []);

  const handleCheckout = () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.address) {
      alert("Please fill in all details");
      return;
    }
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    router.push("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="mt-4 font-bold text-lg">Total: ₹{total}</div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Customer Details</h2>
            <Input placeholder="Name" className="mt-2" onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })} />
            <Input placeholder="Email" className="mt-2" type="email" onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })} />
            <Input placeholder="Address" className="mt-2" onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })} />
          </div>
          <Button className="mt-6 w-full" onClick={handleCheckout}>
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
