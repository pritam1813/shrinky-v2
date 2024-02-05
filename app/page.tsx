"use client";
import { useSession } from "next-auth/react";
import Shortener from "@/components/Shortener";
import UrlListTable from "@/components/UrlListTable";
import LoginForm from "@/components/LoginForm";
import { useState } from "react";

interface UrlList {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
  clicks: number;
}

export default function Home() {
  const { status } = useSession();
  const [list, setList] = useState<UrlList[]>([]);

  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">
          {status === "unauthenticated" ? (
            <LoginForm />
          ) : (
            <Shortener list={list} setList={setList} />
          )}
        </div>
      </section>

      {status === "authenticated" && (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto bg-white rounded-lg shadow dark:border w-[90%]">
            <UrlListTable list={list} setList={setList} />
          </div>
        </section>
      )}
    </main>
  );
}
