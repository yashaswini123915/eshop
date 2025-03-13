import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import UserStatus from "@/components/UserStatus";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="p-4 bg-gray-100 shadow-md">
            <UserStatus />
          </header>
          <main className="p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
