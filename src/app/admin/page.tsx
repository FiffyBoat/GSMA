import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await verifySession();

  redirect(session ? "/admin/dashboard" : "/admin/login");
}
