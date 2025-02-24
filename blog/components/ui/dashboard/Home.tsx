import { auth } from "@/auth";
import React from "react";
import Image from "next/image";

const Home = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <main className="flex-1 p-8 flex flex-col items-center justify-center space-y-12">
      {JSON.stringify(session)}
      <h1 className="text-3xl lg:text-4xl font-bold text-center">
        {`Hello!! ${session.user?.name}`}
      </h1>
      <div className="relative flex items-center justify-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={session.user?.image || "/github-icon.png"}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
