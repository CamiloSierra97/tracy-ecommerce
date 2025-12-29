import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import WooCommerceService from "./services/WooCommerceService";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "WordPress",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await WooCommerceService.loginCustomer({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (result.success && result.user) {
          return result.user;
        }

        return null;
      },
    }),
  ],
});
