// File: auth.ts
import NextAuth, { User } from "next-auth"
import Credentialsprovider from "next-auth/providers/credentials"
import { db } from "@/database/drizzle"
import { eq } from "drizzle-orm"
import { users } from "@/database/schema"
import { compare } from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true, // Enable debug mode to see more detailed logs
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentialsprovider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          // Find user by email
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email!.toString()))
            .limit(1);

          if (user.length === 0) {
            console.log("User not found");
            return null;
          }

          // Verify password
          const isPasswordValid = await compare(
            credentials.password.toString(),
            user[0].password
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          // Return user data
          return {
            id: user[0].id,
            name: user[0].fullName,
            email: user[0].email
          } as User;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});