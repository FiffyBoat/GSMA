import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
  const session = await verifySession();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient user={session} />;
}
