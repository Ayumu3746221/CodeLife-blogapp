import React from "react";
import { skill } from "@/types/Prortfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SkillCard: React.FC<skill> = ({ icon, description }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-6 mb-2 rounded-xl shadow-md">
      <div className="text-8xl  text-gray-300 lg:mr-4 lg:px-8 lg:border-r border-gray-400 lg:mb-0 mb-4">
        <FontAwesomeIcon icon={icon} className="w-24" />
      </div>
      <p className="text-center lg:text-left text-gray-300 break-words lg:px-4">
        {description}
      </p>
    </div>
  );
};

export default SkillCard;
