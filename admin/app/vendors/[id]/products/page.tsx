"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VendorLayout from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";

interface Product {
  id: number;
  vendorId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: string;
}

export default function VendorProducts() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    stock: "",
    category: ""
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/vendorproducts?vendorId=${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setNewProduct({ ...newProduct, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.description || !newProduct.stock || !newProduct.category)
      return alert("Please fill all fields!");

    const response = await fetch("/api/vendorproducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProduct, vendorId: Number(id) })
    });

    if (response.ok) {
      const updatedProducts = await response.json();
      setProducts(updatedProducts);
      setNewProduct({ name: "", price: "", image: "", description: "", stock: "", category: "" });
      setImagePreview(null);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({ 
      name: product.name, 
      price: product.price.toString(), 
      image: product.image, 
      description: product.description, 
      stock: product.stock.toString(), 
      category: product.category 
    });
    setImagePreview(product.image);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    const response = await fetch(`/api/vendorproducts/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });

    if (response.ok) {
      const updatedProducts = await response.json();
      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({ name: "", price: "", image: "", description: "", stock: "", category: "" });
      setImagePreview(null);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const response = await fetch(`/api/vendorproducts/${productId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      const updatedProducts = await response.json();
      setProducts(updatedProducts);
    }
  };

  return (
    <VendorLayout username={`Vendor ${id}`} onSignOut={() => router.push("/vendors/login")}>
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-center">Manage Products</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <Input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" />
              <Input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price" />
              <Textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product Description" />
              <Input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="Stock Quantity" />
              <Select onValueChange={(value: string) => setNewProduct({ ...newProduct, category: value })} value={newProduct.category}>
                <SelectTrigger>
                  <span>{newProduct.category || "Select Category"}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="h-20 mx-auto rounded-md" />}
              {editingProduct ? (
                <Button onClick={handleUpdateProduct} className="w-full">Update Product</Button>
              ) : (
                <Button onClick={handleAddProduct} className="w-full">Add Product</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
