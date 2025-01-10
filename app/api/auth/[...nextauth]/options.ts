import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials.email,
          });

          if (!user) {
            console.error("No user found with this email");
            throw new Error("No user found with this email.");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            console.error("Incorrect password");
            throw new Error("Incorrect password.");
          }
        } catch (error: any) {
          console.error("Error in authorization:", error);
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/sign-out",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString() ?? "";
        token.email = user.email ?? "";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id ?? "";
        session.user.email = token.email ?? "";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
