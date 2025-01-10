import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthPorvider";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movies App",
  description: "Find your favorite movie here",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${montserrat.variable} antialiased bg-background relative`}
        >
          {children}
          <footer className="absolute bottom-0 w-full">
            <img
              src="/footer.svg"
              alt="Footer Image"
              className="w-full hidden md:block"
            />
            <img
              src="/mobile-footer.svg"
              alt="Footer Image"
              className="w-full block md:hidden"
            />
          </footer>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
