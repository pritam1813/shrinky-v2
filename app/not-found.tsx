import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h2 className="text-2xl font-extrabold mb-5">
              Sorry ! The Page you are looking for doesn't exists
            </h2>
            <Link
              href={"/"}
              className="bg-slate-950 hover:bg-slate-700 text-white w-20 mx-auto py-3 px-2 rounded-lg hover:cursor-pointer"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default notFound;
