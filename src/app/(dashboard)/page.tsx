import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { caller } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await caller.hello({ text: "Aditya" });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <HomeView />
    </div>
  );
}
