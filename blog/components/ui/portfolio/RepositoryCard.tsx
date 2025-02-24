import { repository } from "@/types/Prortfolio";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const RepositoryCard: React.FC<repository> = ({ url, name, description }) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className=" bg-slate-900 dark:bg-gray-800 rounded-xl shadow-lg p-6 transition flex flex-col lg:flex-row items-center"
    >
      <div className="text-8xl  text-gray-300 lg:mr-4 lg:px-8 lg:border-r border-gray-400 lg:mb-0 mb-4">
        <FontAwesomeIcon icon={faGithub} className="w-24" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-100 dark:text-gray-100 mb-2">
          {name}
        </h3>
        <p className="text-slate-200 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  );
};

export default RepositoryCard;
