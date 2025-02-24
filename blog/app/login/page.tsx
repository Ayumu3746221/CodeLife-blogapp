import React from "react";
import Image from "next/image";
import SignInGoogle from "@/components/ui/auth/SignInGoogle";
import SignInCredentail from "@/components/ui/auth/SignInCredentail";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div className="relative w-24 h-24">
          <Image
            src="/github-icon.png"
            alt="Blog Favicon"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-lg font-semibold">Log in to Dashboard</h2>
        <SignInGoogle />
        <SignInCredentail />
      </div>
    </div>
  );
};

export default LoginPage;
