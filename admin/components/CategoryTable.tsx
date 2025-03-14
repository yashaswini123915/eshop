"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash, Edit } from "lucide-react";

type Category = {
  id: number;
  name: string;
};

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch categories from local storage
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(storedCategories);
  }, []);

  // Save to local storage
  const updateLocalStorage = (updatedCategories: Category[]) => {
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // Add a new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const updatedCategories = [...categories, { id: Date.now(), name: newCategory }];
    setCategories(updatedCategories);
    updateLocalStorage(updatedCategories);
    setNewCategory("");
    setOpen(false);
  };

  // Update an existing category
  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    const updatedCategories = categories.map((cat) =>
      cat.id === editingCategory.id ? { ...cat, name: newCategory } : cat
    );

    setCategories(updatedCategories);
    updateLocalStorage(updatedCategories);
    setEditingCategory(null);
    setNewCategory("");
    setOpen(false);
  };

  // Delete a category
  const handleDeleteCategory = (id: number) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
    updateLocalStorage(updatedCategories);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Categories</h2>
        <Button onClick={() => setOpen(true)}>Add Category</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => {
                      setEditingCategory(category);
                      setNewCategory(category.name);
                      setOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog for adding/editing category */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            >
              {editingCategory ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
