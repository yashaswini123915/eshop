import DashboardStats from "@/components/DashboardStats";
import AdminLayout from "@/components/AdminLayout";


export default function ProductsPage() {
  return (
    <AdminLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">DashboardStats Management</h1>
      <DashboardStats />
    </div>
    </AdminLayout>
  );
}
