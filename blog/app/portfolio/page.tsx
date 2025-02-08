import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/ui/portfolio/SectionTitle";
import { faJava, faJs } from "@fortawesome/free-brands-svg-icons";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { skill, repository } from "@/type/Prortfolio";
import SkillCard from "@/components/ui/portfolio/SkillCard";
import RepositoryCard from "@/components/ui/portfolio/RepositoryCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function page() {
  const skills: skill[] = [
    {
      number: 1,
      icon: faJava,
      description:
        "SpringBootでBE側のDBのCRUD操作をAPIの開発やAPIに対してアクセスを制限・制御することを学習しました。また、TokenをGoogle等のプロバイダーを使用して検証し認可を行うことも学びました。",
    },
    {
      number: 2,
      icon: faJs,
      description:
        "React,Next.jsを使用してフロントエンドの開発を学習しました、このサイトはNext.jsを使用し、API routeの機能を使ってAPI内でCMSの操作やメール送信を行う機能を実装し、クライアント側からAPIを使用してデータを受け取る様にしています。",
    },
  ];

  const repositories: repository[] = [
    {
      number: 1,
      url: "https://github.com/Ayumu3746221/Blog-UI-NextJs",
      name: "Full Stack Blog Project's frontend",
      description:
        "フルススタックでブログアプリを作成した際のフロントエンドのリポジトリ、Next.jsを使用して作成しました。",
    },
    {
      number: 2,
      url: "https://github.com/Ayumu3746221/Blog-API-SpringBoot",
      name: "Full Stack Blog Project's backend",
      description:
        "フルススタックでブログアプリを作成した際のバックエンドのリポジトリ、SpringBootを使用して作成しました。",
    },
    {
      number: 3,
      url: "https://github.com/Ayumu3746221/MyBlogProject",
      name: "This Blog's Github Repository",
      description: "このブログのリポジトリ",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-50">
      <div className="lg:max-w-5xl max-w-72 mx-auto">
        <div className="py-20 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex-1 text-center lg:text-left lg:pl-2">
            <h1 className="text-3xl lg:text-4xl font-semibold">
              Portfolio Page
            </h1>
            <p className="text-lg lg:text-xl">
              This is the portfolio page. I will introduce my skill stack etc.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 flex-none relative w-32 h-32 lg:w-64 lg:h-64">
            <Image
              src="/github-icon.png"
              alt="my-icon"
              width={128}
              height={128}
              className="rounded-full object-cover lg:mt-8"
            />
          </div>
        </div>
        <div className="my-4">
          <div>
            <SectionTitle>Skill Stack</SectionTitle>
          </div>
          <div className="grid grid-cols-1 my-4">
            {skills.map((skill) => (
              <div key={skill.number}>
                <SkillCard {...skill} />
              </div>
            ))}
          </div>
        </div>
        <div className="my-4">
          <div>
            <SectionTitle>Projects</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-6 py-8">
            {repositories.map((repository) => (
              <div key={repository.number}>
                <RepositoryCard {...repository} />
              </div>
            ))}
          </div>
        </div>
        <div className="my-4">
          <SectionTitle>Tech blog</SectionTitle>
          <div className="grid grid-cols-1 gap-6 py-8">
            <Link
              href="https://zenn.dev/ayumu3746221"
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-slate-900 dark:bg-gray-800 rounded-xl shadow-lg p-6 transition flex flex-col lg:flex-row items-center"
            >
              <div className="text-8xl  text-gray-300 lg:mr-4 lg:px-8 lg:border-r border-gray-400 lg:mb-0 mb-4">
                <FontAwesomeIcon icon={faBlog} className="w-24 h-24" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 dark:text-gray-100 mb-2">
                  Zenn
                </h3>
                <p className="text-slate-200 dark:text-gray-300">
                  学んだことをアウトプットする目的で使用しています。
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div>
          <SectionTitle>Contact Me</SectionTitle>
          <div className="py-4">
            <p className="font-semibold text-lg text-center">
              お問い合わせは
              <Link
                href="/contact"
                className="text-blue-500 hover:underline hover:text-blue-400"
              >
                こちら
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
