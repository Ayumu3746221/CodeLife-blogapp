import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
  }
}
