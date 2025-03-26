"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  status: "pending" | "approved" | "rejected";
}

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem("vendorProducts") || "[]");
    const approvedProducts = storedProducts.filter((product) => product.status === "approved");
    setProducts(approvedProducts);
  }, []);

  const addToCart = (product: Product) => {
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
        <div className="space-x-4">
          <Button onClick={() => router.push("/vendors/register")} variant="outline">
            Become a Seller
          </Button>
          <Button onClick={() => router.push("/login")} variant="default">
            Login
          </Button>
        </div>
      </div>

      {/* Product Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-md mb-2"
                />
                <p className="text-gray-600 text-sm">₹{product.price}</p>
                <Button onClick={() => addToCart(product)} className="mt-2 w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
}
