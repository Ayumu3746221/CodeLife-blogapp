import Menu from "@/components/ui/dashboard/Menu";
import React from "react";
import { auth } from "@/auth";
import Home from "@/components/ui/dashboard/Home";

async function DashboardHome() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Menu />
      <Home />
    </div>
  );
}

export default DashboardHome;
