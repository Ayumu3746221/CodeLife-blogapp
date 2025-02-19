import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="block w-full text-left text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
      >
        Sign Out
      </button>
    </form>
  );
}
