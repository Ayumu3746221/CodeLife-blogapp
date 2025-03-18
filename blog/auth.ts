import NextAuth from "next-auth";
import Credentails from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { boolean, isValid } from "zod";
import { ValidationContext } from "./domain/ValidationStrategy/ValidationContext";
import { LoginValidationStrategy } from "./domain/ValidationStrategy/LoginValidationStrategy";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      profile(profile) {
        return {
          id: profile.sub,
          username: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentails({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const { username, password } = credentials;

        // バリデーションチェック
        const isValidation: boolean = new ValidationContext(
          new LoginValidationStrategy()
        ).executeValidation({ username, password });

        if (!isValidation) return null;

        const userData = await prisma.user.findUnique({
          where: { username },
        });

        if (!userData) return null;

        const isPasswordValid = await bcrypt.compareSync(
          password,
          userData.passwordHash
        );

        if (!isPasswordValid) return null;

        return {
          id: userData.id.toString(),
          username: userData.username,
          email: userData.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const isAllowed = await prisma.user.findUnique({
        where: { email: user.email },
      });

      return !!isAllowed;
    },
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.username = (token.username as string) || "";
        session.user.email = (token.email as string) || "";
      }
      return session;
    },
  },
});
