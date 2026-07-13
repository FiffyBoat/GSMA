import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import Link from "next/link";
import LeadershipImage from "@/components/shared/LeadershipImage";
import { ArrowRight } from "lucide-react";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingParagraphs } from "@/lib/site-settings";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";

export const dynamic = "force-dynamic";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  {
    label: "Management",
    href: "/about/leadership",
    children: [
      { label: "MCE Profile", href: "/about/mce-profile" },
      { label: "MCD Profile", href: "/about/mcd-profile" },
    ],
  },
];

function isPublicManagementLeader(leader: any) {
  const position = String(leader.position || "").toLowerCase();

  return (
    !position.includes("parliament") &&
    position !== "mp" &&
    position !== "mce" &&
    position !== "mcd" &&
    !position.includes("municipal chief executive") &&
    !position.includes("municipal coordinating director")
  );
}

export default async function LeadershipPage() {
  const supabase = createPublicServerSupabaseClient();
  const settings = await loadPublicSiteSettings();
  const staticLeaders = [
    {
      title: settings.mce_title,
      name: settings.mce_name,
      role: "MCE",
      position: settings.mce_title,
      href: "/about/mce-profile",
      image_url: settings.mce_image_url,
      isProfileLeader: true,
      description:
        splitSettingParagraphs(settings.mce_intro)[0] ??
        "The Municipal Chief Executive is the political head of the Assembly and is responsible for the day-to-day performance of the executive and administrative functions of the Assembly.",
    },
    {
      title: settings.mcd_title,
      name: settings.mcd_name,
      role: "MCD",
      position: settings.mcd_title,
      href: "/about/mcd-profile",
      image_url: settings.mcd_image_url,
      isProfileLeader: true,
      description:
        splitSettingParagraphs(settings.mcd_intro)[0] ??
        "The Municipal Coordinating Director is the administrative head of the Assembly and is responsible for coordinating the activities of all departments of the Assembly.",
    },
  ];

  const { data: leadership } = await supabase
    .from("leadership")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  const managementLeaders = (leadership || []).filter(isPublicManagementLeader);

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Navbar />
      <PageHeader
        title="Management"
        breadcrumbs={[
          { label: "About Us", href: "/about/overview" },
          { label: "Management" },
        ]}
      />

      <section className="py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] sm:gap-[24px] md:gap-[32px]">
            <div className="lg:col-span-1">
              <Sidebar title="About Us" links={aboutLinks} />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-[18px] sm:p-[22px] md:p-[28px] mb-[28px] sm:mb-[32px] md:mb-[36px]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Management</h2>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                  The Ga South Municipal Assembly is managed by dedicated public servants committed to efficient service delivery and sustainable development across the municipality.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px] pb-[12px] border-b-2 border-[#8B0000]">
                  Management Members
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
                  {staticLeaders.map((leader: any) => (
                    <div key={leader.role} className="bg-white border border-gray-200 rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative w-full h-[220px] sm:h-[250px] md:h-[270px] overflow-hidden bg-[#f8f5ef] flex items-center justify-center">
                        <div className="absolute inset-x-0 top-0 h-12 bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.12),transparent_70%)]" />
                          {leader.image_url ? (
                            <LeadershipImage
                              src={normalizeSupabaseImageUrl(leader.image_url)}
                              alt={leader.name}
                              width={420}
                              height={270}
                              className="w-full h-full p-3 sm:p-4 md:p-5"
                              rounded={false}
                            />
                          ) : (
                            <span className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-[#8B0000]">{leader.role}</span>
                          )}
                      </div>
                      <div className="p-[12px] sm:p-[14px] md:p-[16px]">
                          <h4 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-900">
                            {leader.name}
                          </h4>
                          {leader.position && (
                            <p className="text-[#8B0000] text-[11px] sm:text-[12px] md:text-[13px] font-semibold mb-[7px]">
                              {leader.position}
                            </p>
                          )}
                          {leader.description && (
                            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 leading-relaxed mt-[8px]">
                              {leader.description}
                            </p>
                          )}
                          <Link
                            href={leader.href}
                            className="mt-[10px] inline-flex items-center gap-[8px] text-[#8B0000] font-semibold hover:gap-[10px] transition-all text-[12px] sm:text-[13px] md:text-[14px]"
                          >
                            View Full Profile
                            <ArrowRight className="w-[15px] sm:w-[16px] h-[15px] sm:h-[16px]" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                {managementLeaders.length > 0 && (
                  <div className="mt-[20px] sm:mt-[24px] md:mt-[28px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
                    {managementLeaders.map((leader: any) => (
                    <div key={leader.id || leader.role} className="bg-white border border-gray-200 rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative w-full h-[220px] sm:h-[250px] md:h-[270px] overflow-hidden bg-[#f8f5ef] flex items-center justify-center">
                        <div className="absolute inset-x-0 top-0 h-12 bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.12),transparent_70%)]" />
                          {leader.image_url ? (
                            <LeadershipImage
                              src={normalizeSupabaseImageUrl(leader.image_url)}
                              alt={leader.name}
                              width={420}
                              height={270}
                              className="w-full h-full p-3 sm:p-4 md:p-5"
                              rounded={false}
                            />
                          ) : (
                            <span className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-[#8B0000]">{leader.role || "GSMA"}</span>
                          )}
                      </div>
                      <div className="p-[12px] sm:p-[14px] md:p-[16px]">
                          <h4 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-900">
                            {!leader.isProfileLeader && leader.title && <span>{leader.title} </span>}
                            {leader.name}
                          </h4>
                          {leader.position && (
                            <p className="text-[#8B0000] text-[11px] sm:text-[12px] md:text-[13px] font-semibold mb-[7px]">
                              {leader.position}
                            </p>
                          )}
                          {leader.department && (
                            <p className="text-[10px] sm:text-[11px] md:text-[12px] text-gray-500 mb-[8px] px-[7px] py-[4px] bg-gray-100 rounded inline-block">
                              {leader.department.replace(/-/g, " ").split(" ").map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            </p>
                          )}
                          {leader.bio && (
                            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 leading-relaxed mt-[8px]">
                              {leader.bio}
                            </p>
                          )}
                          {leader.description && (
                            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 leading-relaxed mt-[8px]">
                              {leader.description}
                            </p>
                          )}
                          {leader.href && (
                            <Link
                              href={leader.href}
                              className="mt-[10px] inline-flex items-center gap-[8px] text-[#8B0000] font-semibold hover:gap-[10px] transition-all text-[12px] sm:text-[13px] md:text-[14px]"
                            >
                              View Full Profile
                              <ArrowRight className="w-[15px] sm:w-[16px] h-[15px] sm:h-[16px]" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
