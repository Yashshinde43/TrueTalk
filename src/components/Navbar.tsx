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
      <div className="container mx-auto flex flex-col md:flex-row justify-between item-center">
        <div>
          <span></span>
          <a className="text-2xl font-bold mb-4 md:mb-0" href="/">
            TrueTalk
          </a>
        </div>
        <div className="flex justify-end ">
          {session ? (
            <>
              <span className="mr-4 mt-2 font-bold">
                Welcome {user?.username || user?.email}
              </span>
              <Button className="w-full md:w-auto" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto text-xl bg-black text-white">
                Login
              </Button>
            </Link>
          )}
          <div className="mx-3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
