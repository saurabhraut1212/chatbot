"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 z-10">
      <div className="text-xl font-bold text-blue-700">Chatbot App</div>
      <div className="space-x-6 flex items-center">
        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Home
        </Link>
        {!session?.user ? (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Login
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Register
            </Link>
          </>
        ) : (
          <div className="relative group inline-block">
            <button
              className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center focus:outline-none"
              tabIndex={0}
            >
              {session.user.name || session.user.email}
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
              <Link
                href="/chat"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Chat
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;