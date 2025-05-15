import NextAuth from "next-auth";




declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name:string
      role: "USER"|"ADMIN";
    };
  }

  interface User {
    id: string;
    role: string;
  
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    name:name
  }
}
