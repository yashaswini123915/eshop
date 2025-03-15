import CategoryTable from "@/components/CategoryTable";
import AdminLayout from "@/components/AdminLayout";

export default function CategoriesPage() {
  return (
    <AdminLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <CategoryTable />
    </div>
    </AdminLayout>
  );
}
