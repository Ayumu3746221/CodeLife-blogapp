import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-neutral-950 text-white flex justify-between items-center px-4 h-16 w-full">
      <h1 className="font-semibold text-xl text-nowrap lg:text-3xl">
        Code Life
      </h1>
      <nav>
        <ul className="flex space-x-4 mx-4 lg:mr-11 text-nowrap text-sm lg:text-large lg:space-x-8 lg:font-semibold">
          <li className="hover:text-gray-400 hover:border-slate-200 hover:border-b">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-400 hover:border-slate-200 hover:border-b">
            <Link href="/">Portfolio</Link>
          </li>
          <li className="hover:text-gray-400 hover:border-slate-200 hover:border-b">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
