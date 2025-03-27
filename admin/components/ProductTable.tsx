"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function AdminProductApproval() {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  // Function to update product status in localStorage
  const updateProductStatus = (productId: number, status: "approved" | "rejected") => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, status } : product
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Product Approval</h1>
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
                    product.status === "approved"
                      ? "bg-green-500"
                      : product.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {product.status.toUpperCase()}
                </Badge>
                <div className="mt-4 flex space-x-2">
                  {product.status !== "approved" && (
                    <Button variant="default" onClick={() => updateProductStatus(product.id, "approved")}>
                      Approve
                    </Button> 
                  )}
                  {product.status !== "rejected" && (
                    <Button variant="destructive" onClick={() => updateProductStatus(product.id, "rejected")}>
                      Reject
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
