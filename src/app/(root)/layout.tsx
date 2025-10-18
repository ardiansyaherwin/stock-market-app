import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/molecules/header";
import { auth } from "@/lib/better-auth/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  let session: Awaited<ReturnType<typeof auth.api.getSession>>;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Session fetch failed:", error);
    redirect("/sign-in");
  }
  if (!session?.user) redirect("/sign-in");

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
  return (
    <main className="min-h-screen text-gray-400">
      <Header user={user} />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default Layout;
