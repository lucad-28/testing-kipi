"use client";
import React from "react";
import { signIn } from "next-auth/react";
export default function page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div
        className="text-black flex cursor-pointer h-auto w-64 items-center justify-center rounded-md border border-gray-300 px-4 py-2"
        onClick={() => {
          signIn();
        }}
      >
        Login
      </div>
    </div>
  );
}
