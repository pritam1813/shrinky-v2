"use client";

import React from "react";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import spinner from "../public/spinner.svg";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { User as NextAuthUser } from "next-auth";
import Image from "next/image";

interface User extends NextAuthUser {
  id: string;
}

const ShortenerSchema = z.object({
  url: z.string().url("Not a Valid Url"),
});

const Shortener = () => {
  const { status, data } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  const form = useForm<z.infer<typeof ShortenerSchema>>({
    resolver: zodResolver(ShortenerSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof ShortenerSchema>) => {
    const user = data?.user as User;
    const result = await fetch("/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: formData.url, userId: user.id }),
    });

    console.log(result);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Long Url to Shorten
        </h1>
        <Form {...form}>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="https://example.com/12345/abcde/88....."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Image src={spinner} alt="spinner" className="text-white" />
              ) : (
                "Generate"
              )}
            </Button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <Link
                href={"/signup"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign Up
              </Link>{" "}
              or{" "}
              <Link
                href={"/login"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login
              </Link>{" "}
              to save your data
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Shortener;
