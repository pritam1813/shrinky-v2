"use client";

import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import spinner from "../public/spinner.svg";
import Image from "next/image";
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
    name: z.string().min(3, { message: "Should be atleast 3 characters" }),
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    try {
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await result.json();
      if (response.status > 201) {
        form.setError("root", {
          type: "manual",
          message: response.message,
        });
        //form.formState.isSubmitSuccessful = false;
      } else {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(form.formState.isSubmitSuccessful);
    }
  };
  return (
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
            {form.formState.errors.root && (
              <div className="w-full border border-red-500 rounded-lg bg-red-50 p-2.5">
                <FormMessage className="text-red-500">
                  {form.formState.errors.root.message}
                </FormMessage>
              </div>
            )}
            {form.formState.isSubmitSuccessful && (
              <div className="w-full border border-green-500 rounded-lg bg-green-50 p-2.5">
                <FormMessage className="text-green-500">
                  SignUp Successful. Please Login.
                </FormMessage>
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              disabled={
                form.getValues("terms") == false || form.formState.isSubmitting
              }
            >
              {form.formState.isSubmitting ? (
                <Image
                  src={spinner}
                  alt="spinner widget"
                  className="text-white"
                />
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href={"/"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
