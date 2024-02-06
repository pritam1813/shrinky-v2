"use client";
import { useSession } from "next-auth/react";
import React from "react";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

const Login = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <LoginForm />
    </section>
  );
};

export default Login;
