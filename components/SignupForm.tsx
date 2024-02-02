"use client";

import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    console.log(form.getValues("terms"));
    console.log(data);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <Form {...form}>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="*******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="*******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start">
                      <FormControl>
                        <div className="flex items-center h-5">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-describedby="terms"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                      </FormControl>
                      <div className="ml-3 !mt-0 text-sm">
                        <FormLabel className="font-light text-gray-500 dark:text-gray-300">
                          I accept the{" "}
                          <Link
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href={"/"}
                          >
                            Terms and Conditions
                          </Link>
                        </FormLabel>
                      </div>
                      <FormMessage className="block" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.getValues("terms") == false}
                >
                  Create an account
                </Button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
