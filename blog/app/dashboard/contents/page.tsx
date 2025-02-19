import Menu from "@/components/ui/dashboard/Menu";
import UserContentList from "@/components/ui/dashboard/UserContentList";
import React from "react";

function DashboardContentList() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Menu />
      <div className="w-full">
        <UserContentList />
      </div>
    </div>
  );
}

export default DashboardContentList;
