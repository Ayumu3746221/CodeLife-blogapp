"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../load/Loading";
import useSWR from "swr";
import Link from "next/link";
import { SignOut } from "../auth/SignOut";

interface User {
  id: string;
  user: string;
  icon: string;
  introduction: string;
  mail: string;
}

interface HomeItemProps {
  mail: string;
}

const fetcher = (url: string): Promise<{ response: User }> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch user in Home component");
    }
    return response.json();
  });
};

export const HomeItem = ({ mail }: HomeItemProps) => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response: Response = await fetch(
          `/api/auth/user/id?mail=${mail}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user id");
        }

        const { payload } = await response.json();
        setUserId(payload.user.id);
      } catch (error) {
        console.error("Error fetching user id", error);
      }
    };
    getUserId();
  }, [mail]);

  const { data, error, isLoading } = useSWR(
    userId ? `/api/auth/user?id=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error: faild request userdata</div>;
  return (
    <main className="flex-1 p-8 flex flex-col items-center justify-center space-y-12">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        {`Hello!! ${data?.response.user}`}
      </h1>
      <div className="relative flex items-center justify-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={data?.response.icon || "/github-icon.png"}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4 lg:hidden">
        <Link
          href="/dashboard/edit/article/new"
          className="px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition"
        >
          Next Post
        </Link>
        <Link
          href="/dashboard/contents"
          className="px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition"
        >
          Contents list
        </Link>
      </div>
    </main>
  );
};
