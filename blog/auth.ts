import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ request, auth }) {
      const nexrUrl = new URL(request.url).pathname;
      const protectedUrls = ["/dashboard"];

      if (protectedUrls.some((url) => nexrUrl.startsWith(url))) {
        if (!auth?.user) {
          return false;
        }
      }

      return true;
    },
  },
});
