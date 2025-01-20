"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
export default function Page() {
  const { data: session } = useSession();
  const onLogin = async () => {
    try {
      signIn("google", {
        redirect: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div
        className="text-black flex cursor-pointer h-auto w-64 items-center justify-center rounded-md border border-gray-300 px-4 py-2"
        onClick={async () => await onLogin()}
      >
        Login
      </div>
    </div>
  );
}
