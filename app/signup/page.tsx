"use client";
import SignupForm from "@/components/SignupForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = () => {
  const { status } = useSession();

  if (status === "authenticated") redirect("/");
  return <SignupForm />;
};

export default SignUp;
