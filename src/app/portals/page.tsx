import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingRows } from "@/lib/site-settings";
import {
  Building,
  CreditCard,
  ExternalLink,
  FileText,
  Globe,
  Map,
  Shield,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

const categoryIcons = {
  Government: Building,
  Services: FileText,
  Information: Globe,
};

export default async function PortalsPage() {
  const settings = await loadPublicSiteSettings();
  const portalRows = splitSettingRows(settings.portals_items);
  const portals = portalRows.map(([category, name, url, description]) => ({
    category,
    name,
    url,
    description,
  }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Portals" breadcrumbs={[{ label: "Portals" }]} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Useful Links & Portals
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {settings.portals_intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {["All", ...new Set(portals.map((portal) => portal.category))].map(
              (category) => (
                <span
                  key={category}
                  className={`px-5 py-2 rounded-full text-sm font-medium ${
                    category === "All"
                      ? "bg-[#8B0000] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </span>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portals.map((portal) => {
              const Icon =
                categoryIcons[portal.category as keyof typeof categoryIcons] ??
                Globe;

              return (
                <a
                  key={`${portal.name}-${portal.url}`}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-[#8B0000] transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B0000] transition-colors">
                      <Icon className="w-6 h-6 text-[#8B0000] group-hover:text-white transition-colors" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#8B0000] transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#8B0000] transition-colors">
                    {portal.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {portal.description}
                  </p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {portal.category}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-16 bg-[#8B0000] rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {settings.portals_cta_title}
                </h2>
                <p className="text-white/90 mb-6">{settings.portals_cta_body}</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#ffcc00] text-[#8B0000] font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  Contact Us
                </a>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white/80 text-sm mb-2">Customer Service Hours</p>
                <p className="text-white font-semibold">
                  {settings.portals_cta_hours}
                </p>
                <p className="text-white/80 text-sm mt-4">Phone</p>
                <p className="text-white font-semibold">
                  {settings.portals_cta_phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
