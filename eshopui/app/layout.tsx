import "./globals.css";
import AuthProvider from "@/components/SessionProvider"; // Import SessionProvider
import UserStatus from "@/components/UserStatus"; // Import UserStatus component

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header className="p-4 bg-gray-100 shadow-md">
            <UserStatus /> {/* Display authentication status */}
          </header>
          <main className="p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
