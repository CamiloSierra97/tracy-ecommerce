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

        try {
          const result = await WooCommerceService.loginCustomer({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (result.success && result.user) {
            return result.user;
          }

          return null;
        } catch (error) {
          console.error("Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        try {
          // 1. Verificar si el usuario ya existe en WooCommerce
          const existingCustomer = await WooCommerceService.getCustomerByEmail(
            user.email,
          );

          if (existingCustomer) {
            // Usuario existe, permitir login
            return true;
          }

          // 2. Si no existe, crear usuario en WooCommerce
          // Generar una contraseña aleatoria fuerte (el usuario usará Google para entrar)
          const randomPassword = crypto.randomUUID() + "A!1";

          const firstName =
            profile?.given_name || user.name?.split(" ")[0] || "User";
          const lastName =
            profile?.family_name ||
            user.name?.split(" ").slice(1).join(" ") ||
            "";

          const registerResult = await WooCommerceService.registerCustomer({
            email: user.email,
            first_name: firstName,
            last_name: lastName,
            username: user.email.split("@")[0], // Username basado en email
            password: randomPassword,
          });

          if (registerResult.success) {
            return true;
          } else {
            console.error(
              "Error creating WC customer from Google Login:",
              registerResult,
            );
            return false;
          }
        } catch (error) {
          console.error("Error in Google Login flow:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
