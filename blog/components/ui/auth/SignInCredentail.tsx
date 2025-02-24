import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        try {
          await signIn("credentials", formData, { redirect: "false" });
        } catch (error: any) {
          if (
            (error &&
              typeof error === "object" &&
              error.digest &&
              String(error.digest).includes("NEXT_REDIRECT")) ||
            (error &&
              typeof error === "string" &&
              error.includes("NEXT_REDIRECT"))
          ) {
            redirect("/dashboard");
          } else {
            console.error(error);
          }
        }
      }}
      className="flex flex-col space-y-4 w-full max-w-sm"
    >
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          User name
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}
