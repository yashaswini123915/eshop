"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  vendorId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  status: "pending" | "approved" | "rejected";
}
export  const runtime = "edge";
export default function VendorProductListings() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get all products from local storage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    // Filter products belonging to the logged-in vendor
    const vendorProducts = storedProducts.filter((product: Product) => product.vendorId === Number(id));

    setProducts(vendorProducts);
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md mb-2" />
                <p className="text-gray-600 text-sm">₹{product.price}</p>
                <Badge
                  className={`mt-2 ${
                    product.status === "approved" ? "bg-green-500" :
                    product.status === "rejected" ? "bg-red-500" :
                    "bg-yellow-500"
                  }`}
                >
                  {product.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
