import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import IPinfoWrapper, { IPinfo } from "node-ipinfo";

const ipinfoWrapper = new IPinfoWrapper(`${process.env.IP_INFO_TOKEN}`);

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const shortUrl = pathname.split("/")[1];

    let url = await prisma.url.findUnique({
      where: { shortUrl },
    });

    if (url) {
      // Looking for IP address
      let ip = req.headers.get("x-forwarded-for");
      if (ip) {
        const ips = ip.split(",");
        ip = ips[0];
      }

      // Getting country from IP
      let ipInfo: IPinfo = await ipinfoWrapper.lookupIp(ip!);
      if (ipInfo.country === undefined) {
        ipInfo.country = "Unknown";
      }

      let location = await prisma.location.findFirst({
        where: { urlId: url.id, country: ipInfo.country },
      });
      if (!location) {
        location = await prisma.location.create({
          data: { country: ipInfo.country, clicks: 1, urlId: url.id },
        });
      } else {
        location = await prisma.location.update({
          where: { id: location.id },
          data: { clicks: { increment: 1 } },
        });
      }

      // Finally Updating URL
      url = await prisma.url.update({
        where: { shortUrl },
        data: { clicks: { increment: 1 } },
      });
      return NextResponse.redirect(url.originalUrl, { status: 307 });
    } else {
      return NextResponse.redirect(new URL("/404", req.url), {
        status: 307,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
