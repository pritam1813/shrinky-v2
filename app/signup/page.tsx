"use client";
import SignupForm from "@/components/SignupForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = () => {
  const { status } = useSession();

  if (status === "authenticated") redirect("/");
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <SignupForm />
      </div>
    </section>
  );
};

export default SignUp;
