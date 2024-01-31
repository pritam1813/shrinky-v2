import Shortener from "@/components/Shortener";
import UrlListTable from "@/components/UrlListTable";

export default function Home() {
  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">
          <Shortener />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto bg-white rounded-lg shadow dark:border w-[90%]">
          <UrlListTable />
        </div>
      </section>
    </main>
  );
}
