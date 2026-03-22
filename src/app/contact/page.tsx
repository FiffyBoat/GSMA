import ContactPageClient from "@/components/contact-page-client";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await loadPublicSiteSettings();

  return <ContactPageClient settings={settings} />;
}
