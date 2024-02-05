"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSession } from "next-auth/react";
import { User as NextAuthUser } from "next-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faEdit,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface User extends NextAuthUser {
  id: string;
}

interface UrlList {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
  clicks: number;
}

interface UrlListProps {
  list: UrlList[];
  setList: React.Dispatch<React.SetStateAction<UrlList[]>>;
}

const UrlListTable = ({ list, setList }: UrlListProps) => {
  const { status, data } = useSession();
  const [isCopied, setCopied] = useState<boolean[]>([]);
  const user = data?.user as User;

  if (status === "unauthenticated") return null;

  useEffect(() => {
    fetch(`/api/users/urls/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setCopied(new Array(data.length).fill(false));
      });
  }, []);

  const copyToClipboard = (index: number) => {
    navigator.clipboard.writeText(list[index].shortUrl);
    setCopied((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setTimeout(() => {
      // Reset the icon after 3 seconds
      setCopied((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }, 3000);
  };

  const updateUrl = (id: string, newUrl: string) => {
    fetch(`/api/urls/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, newUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(
          list.map((item) =>
            item.id === id ? { ...item, originalUrl: newUrl } : item
          )
        );
      });
  };

  const deleteUrl = (id: string) => {
    fetch(`/api/urls/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(list.filter((item) => item.id !== id));
      });
  };

  return (
    <Table className="text-center">
      <TableCaption>A list of your recent Short Urls</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xl text-center">Short Url</TableHead>
          <TableHead className="text-xl text-center">Original Url</TableHead>
          <TableHead className="text-xl text-center">Date</TableHead>
          <TableHead className="text-xl text-center">Clicks</TableHead>
          <TableHead className="text-xl text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="flex justify-center">
              {item.shortUrl}

              <button onClick={() => copyToClipboard(index)}>
                <FontAwesomeIcon
                  icon={isCopied[index] ? faCheck : faCopy}
                  className="ml-2"
                />
              </button>
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {`${item.originalUrl.substring(0, 20)}.....`}
                  </TooltipTrigger>
                  <TooltipContent>{item.originalUrl}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>
              {new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>{item.clicks}</TableCell>
            <TableCell className="flex justify-center space-x-4">
              {/* Update Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Url</DialogTitle>
                    <DialogDescription>
                      Edit your Original URL Here
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`name${index}`} className="text-right">
                        Original Url
                      </Label>
                      <Input
                        id={`name${index}`}
                        defaultValue={item.originalUrl}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose
                      onClick={() => {
                        const inputElement = document.getElementById(
                          `name${index}`
                        );
                        if (inputElement) {
                          const newUrl = (inputElement as HTMLInputElement)
                            .value;
                          updateUrl(item.id, newUrl);
                        }
                      }}
                      className="h-10 px-4 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                    >
                      Save Changes
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FontAwesomeIcon icon={faRemove} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Warning !! Link redirects for URL{" "}
                      {`${process.env.NEXT_PUBLIC_SITE_URL}/${item.shortUrl}`}{" "}
                      will stop working
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose
                      onClick={() => deleteUrl(item.id)}
                      className="h-10 px-4 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                    >
                      Delete Anyway
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UrlListTable;
