import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentUser } from "@/lib/auth";

export default async function AuthPage() {
  const authEnabled = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (authEnabled) {
    const { user } = await getCurrentUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="py-6">
      <div className="mx-auto mb-5 max-w-md text-center">
        <h1 className="text-3xl font-semibold text-ink">Vendor access</h1>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          Sign up or log in to keep today’s location, status, and produce availability current.
        </p>
      </div>
      <AuthForm />
    </div>
  );
}
