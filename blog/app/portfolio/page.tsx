import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/ui/portfolio/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJava } from "@fortawesome/free-brands-svg-icons";

function page() {
  return (
    <div className="w-full h-screen bg-slate-950 text-slate-50">
      <div className="lg:max-w-5xl max-w-72 mx-auto">
        <div className="py-20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Portfolio Page
            </h1>
            <p className="text-lg md:text-xl">
              This is the portfolio page. Here you can showcase your projects.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex-none relative w-32 h-32 md:w-64 md:h-64">
            <Image
              src="/github-icon.png"
              alt="my-icon"
              width={128}
              height={128}
              className="rounded-full object-cover md:mt-8"
            />
          </div>
        </div>
        <div>
          <div>
            <SectionTitle>Skill Stack</SectionTitle>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex flex-col items-center p-6 rounded-xl shadow-md">
              <div className="">
                <FontAwesomeIcon icon={faJava} />
              </div>
              <p className="text-center text-gray-300">
                SpringBootでBE側のDBのCRUD操作をAPIの開発やAPIに対してアクセスを制限・制御することを学習しました。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
