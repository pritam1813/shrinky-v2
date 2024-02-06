"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();

  return (
    <nav
      className={`flex items-center p-3 ${
        status === "authenticated" ? "justify-between" : "justify-center"
      }`}
    >
      <div className="text-gray-900 text-2xl font-extrabold">
        <h1>Shrinky</h1>
      </div>
      {status === "authenticated" && (
        <div className="flex items-center">
          <Button
            onClick={async () =>
              await signOut({ redirect: false, callbackUrl: "/login" })
            }
          >
            Sign Out
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
