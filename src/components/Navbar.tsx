"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between w-full md:w-auto">
          <a className="text-2xl font-bold mb-4 md:mb-0" href="/">
            TrueTalk
          </a>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {/* Placeholder for mobile menu toggle button */}
          </div>
        </div>

        {/* Navigation and User Section */}
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 w-full md:w-auto justify-end">
          {session ? (
            <>
              <span className="mr-4 mt-2 font-bold text-center md:text-left">
                Welcome {user?.username || user?.email}
              </span>
              <Button className="w-full md:w-auto mt-2 md:mt-0" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in" className="w-full md:w-auto mt-2 md:mt-0 flex justify-end md:block">
              <Button className="w-full md:w-auto text-xl bg-black text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
