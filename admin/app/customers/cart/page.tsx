"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    localStorage.setItem("order", JSON.stringify(cart));
    router.push("/checkout");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cart.map((item) => (
            <Card key={item.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-md mb-2" />
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <Button onClick={() => updateQuantity(item.id, -1)} variant="outline">-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button onClick={() => updateQuantity(item.id, 1)} variant="outline">+</Button>
                </div>
                <Button onClick={() => removeItem(item.id)} variant="destructive" className="mt-2">Remove</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <Button onClick={handleCheckout} className="mt-4">Proceed to Checkout</Button>
      )}
    </div>
  );
}
