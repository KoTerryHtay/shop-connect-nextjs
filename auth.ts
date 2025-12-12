import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        id: {},
        email: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // console.log("credentials >>>", credentials);
        const user = {
          id: credentials.id as string,
          email: credentials.email as string,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    // This is the only place that receives the user object from authorize . It runs immediately after login. You must copy the user.id into the token here
    async jwt({ token, user }) {
      // console.log("jwt >>>", { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // This runs whenever you call useSession() in the client
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      // console.log("session >>>", { session, token });

      return session;
    },
  },
});
