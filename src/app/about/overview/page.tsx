import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import {
  splitSettingParagraphs,
  splitSettingRows,
} from "@/lib/site-settings";
import {
  ArrowRight,
  Eye,
  Heart,
  MapPin,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "MCE Profile", href: "/about/mce-profile" },
  { label: "MCD Profile", href: "/about/mcd-profile" },
];

const valueIcons = [Star, Zap, ArrowRight, Heart, Users];

export default async function OverviewPage() {
  const settings = await loadPublicSiteSettings();
  const introParagraphs = splitSettingParagraphs(settings.about_overview_intro);
  const historyParagraphs = splitSettingParagraphs(
    settings.about_overview_history
  );
  const coreValues = splitSettingRows(settings.about_overview_core_values);
  const keyFacts = splitSettingRows(settings.about_overview_key_facts);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Overview"
        breadcrumbs={[
          { label: "About Us", href: "/about/overview" },
          { label: "Overview" },
        ]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[24px] sm:gap-[28px] md:gap-[32px]">
            <div className="lg:col-span-1">
              <Sidebar title="About Us" links={aboutLinks} />
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px]">
                  About Ga South Municipal Assembly
                </h2>

                {introParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-gray-600 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] mb-[20px] sm:mb-[24px] text-[13px] sm:text-[14px] md:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}

                {historyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-gray-600 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] mb-[24px] sm:mb-[28px] md:mb-[32px] text-[13px] sm:text-[14px] md:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  <div className="bg-[#8B0000]/5 p-[16px] sm:p-[20px] md:p-[24px] rounded-lg border-l-4 border-[#8B0000]">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] mb-[12px] sm:mb-[14px]">
                      <Eye className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000]" />
                      <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900">
                        Our Vision
                      </h3>
                    </div>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6]">
                      {settings.about_overview_vision}
                    </p>
                  </div>

                  <div className="bg-[#ffcc00]/10 p-[16px] sm:p-[20px] md:p-[24px] rounded-lg border-l-4 border-[#ffcc00]">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] mb-[12px] sm:mb-[14px]">
                      <Target className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000]" />
                      <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900">
                        Our Mission
                      </h3>
                    </div>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6]">
                      {settings.about_overview_mission}
                    </p>
                  </div>
                </div>

                <div className="bg-[#ffcc00]/10 p-[16px] sm:p-[20px] md:p-[24px] rounded-lg border-l-4 border-[#ffcc00] mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px]">
                    Core Values
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[14px] md:gap-[16px]">
                    {coreValues.map(([title, description], index) => {
                      const Icon = valueIcons[index] ?? Star;
                      return (
                        <div key={`${title}-${index}`} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#8B0000] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#8B0000]" />
                          </div>
                          <div>
                            <h4 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-1">
                              {title}
                            </h4>
                            <p className="text-gray-600 text-[12px] sm:text-[13px] leading-[1.5]">
                              {description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                  Key Facts
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[14px] md:gap-[16px] lg:gap-[18px] mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  {keyFacts.map(([value, label], index) => (
                    <div
                      key={`${label}-${index}`}
                      className="bg-white border border-gray-200 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg text-center"
                    >
                      <MapPin className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000] mx-auto mb-[8px] sm:mb-[10px]" />
                      <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#8B0000]">
                        {value}
                      </p>
                      <p className="text-gray-500 text-[11px] sm:text-[12px] md:text-[13px]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                  Location & Boundaries
                </h3>
                <p className="text-gray-600 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] text-[13px] sm:text-[14px] md:text-[15px]">
                  {settings.about_overview_boundaries}
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
