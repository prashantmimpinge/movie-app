"use client"
import Link from "next/link";
import React from "react";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="flex justify-between items-center text-white">
      <Link href="/dashboard/add" className="flex items-center justify-center gap-3">
        <Heading variant="headingTwo">My movies</Heading>
        <img src="/plus.svg" alt="plus icon" className="h-7 w-7" />
      </Link>

      <button onClick={() => signOut()} className="flex items-center justify-center gap-3 outline-none border-none bg-transparent">
        <Paragraph variant="bodyRegular" className="hidden md:block">
          Logout
        </Paragraph>
        <img src="/logout.svg" alt="logout icon" className="h-7 w-7" />
      </button>
    </div>
  );
};

export default Header;
