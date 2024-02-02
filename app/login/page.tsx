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

  return <LoginForm />;
};

export default Login;
