import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import { compare } from "bcrypt";
import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  id: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Adding logic here to look up the user from the credentials supplied

        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          const match = await compare(credentials!.password, user.password);
          if (!match) {
            return null;
          }
          user.password = "";
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        const user = session.user as User;
        user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
