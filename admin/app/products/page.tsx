import ProductTable from "@/components/ProductTable";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <ProductTable />
    </div>
  );
}
