import Link from "next/link";
import React from "react";
import { SignOut } from "../auth/SignOut";

const Menu = () => {
  return (
    <aside className="hidden lg:block w-full lg:w-1/6 min-h-screen border-r border-gray-300 bg-white">
      <div className="p-8">
        <h2 className="mb-6 text-xl font-bold text-gray-800">Dashboard Menu</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/dashboard"
                className="block text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/edit/article/new"
                className="block text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
              >
                New post
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/contents"
                className="block text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
              >
                Contents
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/avatar"
                className="block text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
              >
                Setting
              </Link>
            </li>
            <li>
              <SignOut />
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;
