import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        console.log("credentials >>>", credentials);
        console.log("credentials >>>", { email, password });

        // find user
        // const user = await prisma.user.findUnique({ where: { email } });
        // if (!user) return null;

        // // compare password
        // const isValid = await bcrypt.compare(password, user.password);
        // if (!isValid) return null;

        // NextAuth expects at least { id, email }
        return {
          id: "1",
          name: "Test User",
          email: email as string,
        };
      },
    }),
  ],
  callbacks: {
    // This is the only place that receives the user object from authorize . It runs immediately after login. You must copy the user.id into the token here
    async jwt({ token, user }) {
      console.log("jwt >>>", { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // This runs whenever you call useSession() in the client
    async session({ session, token }) {
      console.log("session >>>", { session, token });
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
