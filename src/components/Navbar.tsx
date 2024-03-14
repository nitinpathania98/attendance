"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import SignoutButton from "./SignOutButton";

const Navbar = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 backdrop-blur-lg `,
        {
          "border-b border-gray-200 bg-white/30 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white/25 backdrop-blur-lg":
            selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex ">
            <div className="h-10 w-10 rounded-full bg-zinc-300 flex items-center justify-center text-center">
              <span className="font-semibold text-sm">AD</span>
            </div>
          </div>
          <div className="md:me-4  me-6">
            <button
              className="h-10 w-10 rounded-full bg-zinc-300 flex items-center justify-center text-center"
            >
              <span className="font-semibold text-sm">
                <SignoutButton />
              </span>
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
