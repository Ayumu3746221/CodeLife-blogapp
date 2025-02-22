import { auth } from "@/auth";
import UserSettingEditor from "@/components/ui/dashboard/edit/UserSettingEditor";
import Menu from "@/components/ui/dashboard/Menu";
import React from "react";

async function AvatarEdit() {
  const session = await auth();
  if (!session?.user || !session.user.email) {
    return <div>Unauthorized</div>;
  }

  const userMail = session.user.email;

  return (
    <div className="flex w-full">
      <Menu />
      <UserSettingEditor mail={userMail} />
    </div>
  );
}

export default AvatarEdit;
