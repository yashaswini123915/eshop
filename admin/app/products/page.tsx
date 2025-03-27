import ProductTable from "@/components/ProductTable";
import AdminLayout from "@/components/AdminLayout";
export  const runtime = "edge";
export default function ProductsPage() {
  return (
    <AdminLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <ProductTable />
    </div>
    </AdminLayout>
  );
}
