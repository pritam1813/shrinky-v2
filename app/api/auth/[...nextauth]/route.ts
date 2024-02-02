import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },

      async authorize(credentials, req) {
        // Adding logic here to look up the user from the credentials supplied

        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          if (user.password !== credentials?.password) {
            return null;
          }
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
