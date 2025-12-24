import { signIn } from "@/auth";

export default function LoginButton() {
  return (
    <form
      className="login-button"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        aria-label="Mi Cuenta"
        className="login-button__submit"
      >
        Sign in with Google
      </button>
    </form>
  );
}
