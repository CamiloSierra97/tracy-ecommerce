import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

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

        // Example JWT endpoint for WordPress (requires plugin like JWT Authentication for WP-API)
        const res = await fetch(
          `${process.env.WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.email, // WP usually accepts email as username often, or we need to resolve it
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data?.token) {
          return {
            id: data.user_email, // or data.user_id
            name: data.user_display_name,
            email: data.user_email,
            // image: data.user_avatar // if available
          };
        }

        // If standard JWT fails, we might want to log it or return null
        console.error("WP Auth Failed:", data);
        return null;
      },
    }),
  ],
});
