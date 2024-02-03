"use server";

import { redirect } from "next/navigation";

const ShortIdAccess = async ({ params }: { params: { shortId: string } }) => {
  let orginalUrl = "";
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/urls/${params.shortId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    orginalUrl = data.originalUrl;
  } catch (error) {
    console.log(error);
  }
  redirect(orginalUrl);
};

export default ShortIdAccess;
