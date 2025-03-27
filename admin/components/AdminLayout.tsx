import Sidebar from "@/components/Sidebar" ; 
 export  const runtime = "edge";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
