import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { generateVerificationtokenbyemail } from "./generate-verification-tokensbyemail";
import { sendVerificationEmail } from "./sendVerificationTokenByEmail";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email:email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password as string, user.password);
        if (!isValid) return null;

        if (!user.emailVerified) {
          const token = await generateVerificationtokenbyemail(email as string);
          await sendVerificationEmail(email as string, token.token,"verify-email");
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name
      } else if (token.email && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true, id: true },
        });
        token.role = dbUser?.role ?? "USER";
        token.id = dbUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
     if (session.user && token) {
      session.user.name=token.name as string,
    session.user.id = token.id  as string;
    session.user.email = token.email ?? "";
      session.user.role = (token.role === "ADMIN" || token.role === "USER") 
      ? token.role 
      : "USER";
  }
  return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3, 
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 3,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
} )

