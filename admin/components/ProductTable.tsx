"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash, Edit } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, category: "" });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load products from local storage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) setProducts(JSON.parse(storedProducts));
  }, []);

  // Save products to local storage
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Add a new product
  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || !newProduct.category) return;
    const newEntry = { id: Date.now(), ...newProduct };
    saveProducts([...products, newEntry]);
    setNewProduct({ name: "", price: 0, category: "" });
  };

  // Edit an existing product
  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    const updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    saveProducts(updatedProducts);
    setEditingProduct(null);
  };

  // Delete a product
  const handleDeleteProduct = (id: number) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    saveProducts(filteredProducts);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <Input
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" onClick={() => setEditingProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Edit Product</DialogTitle>
                    <Input
                      placeholder="Name"
                      value={editingProduct?.name || ""}
                      onChange={(e) =>
                        setEditingProduct((prev) => (prev ? { ...prev, name: e.target.value } : null))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={editingProduct?.price || 0}
                      onChange={(e) =>
                        setEditingProduct((prev) => (prev ? { ...prev, price: parseFloat(e.target.value) } : null))
                      }
                    />
                    <Input
                      placeholder="Category"
                      value={editingProduct?.category || ""}
                      onChange={(e) =>
                        setEditingProduct((prev) => (prev ? { ...prev, category: e.target.value } : null))
                      }
                    />
                    <Button onClick={handleUpdateProduct}>Save Changes</Button>
                  </DialogContent>
                </Dialog>
                <Button size="icon" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
