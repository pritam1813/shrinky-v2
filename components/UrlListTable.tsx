"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface UrlList {
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
  clicks: number;
}

const UrlListTable = () => {
  const [data, setData] = useState<UrlList[]>([]);

  useEffect(() => {
    fetch("/api/urls")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Table>
      <TableCaption>A list of your recent Short Urls</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xl">Short Url</TableHead>
          <TableHead className="text-xl">Original Url</TableHead>
          <TableHead className="text-xl">Date</TableHead>
          <TableHead className="text-xl">Clicks</TableHead>
          <TableHead className="text-xl">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.shortUrl}</TableCell>
            <TableCell>{item.originalUrl}</TableCell>
            <TableCell>
              {new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>{item.clicks}</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UrlListTable;
