import { auth } from "@/auth";
import React from "react";
import { HomeItem } from "./HomeItem";

const Home = async () => {
  const session = await auth();
  if (!session?.user || !session.user.email) {
    return <div>Unauthorized</div>;
  }

  const userMail = session.user.email;
  return <HomeItem mail={userMail} />;
};

export default Home;
