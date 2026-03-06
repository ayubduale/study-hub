"use client";

import Link from "next/link";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          StudyGroups
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/groups" className="text-gray-600 hover:text-gray-900">
            Browse Groups
          </Link>
          {isSignedIn ? (
            <>
              <Link
                href="/groups/create"
                className="text-gray-600 hover:text-gray-900"
              >
                Create Group
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {user?.fullName || user?.emailAddresses[0]?.emailAddress}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Register
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
