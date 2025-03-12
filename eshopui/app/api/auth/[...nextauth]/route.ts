import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

        // Simulated user data (Replace with real DB logic)
        const user = { 
          id: "1", 
          name: "Mudragadda Rajani Yashaswini", 
          email: "mudragaddarajaniyashaswini@gmail.com", 
          password: "hello" // Change to your password
        };


        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          throw new Error("Please enter email and password");
        }

        if (credentials.email !== user.email || credentials.password !== user.password) {
          console.error("Invalid credentials");
          throw new Error("Invalid email or password");
        }

        console.log("User authenticated:", user);
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirect errors to sign-in page
  },
  debug: true, // Enable debugging logs
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
