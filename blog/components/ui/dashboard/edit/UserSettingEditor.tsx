"use client";

import { UpdateUserType } from "@/types/UpdateUserType";
import React, { useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Loading from "../../load/Loading";
import TextEditor from "./editor/TextEditor";
import TextAreaEditor from "./editor/TextAreaEditor";
import SelectMediaModal from "./editor/SelectMediaModal";

type UserSettingEditorProps = {
  mail: string;
};

type SettingUserType = {
  id: string;
  user: string;
  icon: string;
  introduction: string;
  mail: string;
};

const fetcher = (url: string): Promise<{ response: UpdateUserType }> => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    return response.json();
  });
};

const UserSettingEditor = ({ mail }: UserSettingEditorProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [settingUser, setSettingUser] = useState<SettingUserType>({
    id: "",
    user: "",
    icon: "",
    introduction: "",
    mail: "",
  });

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
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (data) {
      setSettingUser(data.response);
    }
  }, [data]);

  const handleUserNickName = useCallback((name: string) => {
    setSettingUser((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, user: name };
    });
  }, []);

  const handleUserIntroduction = useCallback((introduction: string) => {
    setSettingUser((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, introduction: introduction };
    });
  }, []);

  const handleMediaChange = useCallback((url: string) => {
    setSettingUser((prev) => ({
      ...prev,
      icon: url,
    }));
  }, []);

  const handleUserUpdate = useCallback(async () => {
    try {
      const response: Response = await fetch("/api/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      alert("User information updated successfully");
    } finally {
      mutate(`/api/auth/user?id=${userId}`);
    }
  }, [settingUser]);

  if (isLoading || !userId) {
    return <Loading />;
  }

  if (error || !data) {
    return <div>Error: data fetching</div>;
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-[90%] mx-auto">
        <div className="mt-4">
          <div className="mb-4 w-[60%] mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">User Icon</h1>
            {settingUser.icon ? (
              <img
                src={settingUser.icon}
                alt="Eyecatch"
                className="w-32 h-32 object-cover cursor-pointer mx-auto rounded-full"
                onClick={() => setModalOpen(true)}
              />
            ) : (
              <div
                className="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-600 cursor-pointer mx-auto rounded-full"
                onClick={() => setModalOpen(true)}
              >
                No Image
              </div>
            )}
            <SelectMediaModal
              isModalOpen={modalOpen}
              setModalOpen={setModalOpen}
              handleMediaChange={handleMediaChange}
            />
          </div>
        </div>
        <div className="mt-4 w-[60%] mx-auto py-4">
          <TextEditor
            subject="User Nickname"
            text={settingUser.user}
            handleTextChange={handleUserNickName}
          />
        </div>
        <div className="mt-4 w-[60%] mx-auto py-4">
          <TextAreaEditor
            subject="Introduction"
            text={settingUser.introduction}
            handleTextChange={handleUserIntroduction}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={handleUserUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingEditor;
