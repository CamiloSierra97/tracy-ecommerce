import { signIn } from "@/auth";

export default function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" aria-label="Mi Cuenta">
        Sign in with Google
      </button>
    </form>
  );
}
