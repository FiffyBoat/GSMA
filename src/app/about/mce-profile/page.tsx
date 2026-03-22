import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import LeadershipImage from "@/components/shared/LeadershipImage";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { splitSettingParagraphs } from "@/lib/site-settings";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";
import { Award, Briefcase, Quote } from "lucide-react";

export const dynamic = "force-dynamic";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "MCE Profile", href: "/about/mce-profile" },
  { label: "MCD Profile", href: "/about/mcd-profile" },
];

export default async function MCEProfilePage() {
  const settings = await loadPublicSiteSettings();
  const introductionParagraphs = splitSettingParagraphs(settings.mce_intro);
  const roleParagraphs = splitSettingParagraphs(settings.mce_role_body);
  const previousParagraphs = splitSettingParagraphs(settings.mce_previous_body);
  const contactParagraphs = splitSettingParagraphs(settings.mce_contact_note);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="MCE Profile"
        breadcrumbs={[
          { label: "About Us", href: "/about/overview" },
          { label: "MCE Profile" },
        ]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] sm:gap-[24px] md:gap-[32px]">
            <div className="lg:col-span-1">
              <Sidebar title="About Us" links={aboutLinks} />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] mb-[28px] sm:mb-[32px] md:mb-[36px]">
                  <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-[#8B0000] to-[#6B0000] rounded-lg p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] text-center relative overflow-hidden">
                      <LeadershipImage
                        src={normalizeSupabaseImageUrl(settings.mce_image_url)}
                        alt={settings.mce_name}
                        width={300}
                        height={400}
                        className="w-full h-[360px] rounded-lg object-contain bg-white/10 p-2"
                        rounded={false}
                      />
                      <div className="mt-[14px] sm:mt-[16px] md:mt-[18px]">
                        <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-white mb-[4px] sm:mb-[6px]">
                          {settings.mce_name}
                        </h3>
                        <p className="text-[#ffcc00] text-[12px] sm:text-[13px] md:text-[14px] font-medium">
                          {settings.mce_title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">
                      {settings.mce_name}
                    </h2>
                    <p className="text-[#8B0000] text-[14px] sm:text-[15px] md:text-[16px] font-semibold mb-[16px] sm:mb-[18px] md:mb-[20px]">
                      {settings.mce_title}
                    </p>

                    <div className="bg-[#8B0000]/5 p-[12px] sm:p-[14px] md:p-[16px] lg:p-[18px] rounded-lg mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[24px] border-l-4 border-[#8B0000]">
                      <Quote className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-[#8B0000] mb-[8px] sm:mb-[10px]" />
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-700 italic">
                        &quot;{settings.mce_quote}&quot;
                      </p>
                    </div>

                    <div className="space-y-[16px] sm:space-y-[18px] md:space-y-[20px]">
                      {introductionParagraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] mb-[28px] sm:mb-[32px] md:mb-[36px]">
                  <div className="bg-gray-50 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                      <Briefcase className="w-[28px] sm:w-[30px] md:w-[32px] h-[28px] sm:h-[30px] md:h-[32px] text-[#8B0000] shrink-0" />
                      <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">
                        {settings.mce_role_heading}
                      </h3>
                    </div>
                    <div className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 space-y-[12px] sm:space-y-[14px]">
                      {roleParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                      <Award className="w-[28px] sm:w-[30px] md:w-[32px] h-[28px] sm:h-[30px] md:h-[32px] text-[#8B0000] shrink-0" />
                      <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">
                        {settings.mce_previous_heading}
                      </h3>
                    </div>
                    <div className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 space-y-[8px]">
                      <p className="font-semibold text-gray-800">
                        {settings.mce_previous_name}
                      </p>
                      {previousParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffcc00]/10 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg">
                  <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                    <Award className="w-[28px] sm:w-[30px] md:w-[32px] h-[28px] sm:h-[30px] md:h-[32px] text-[#8B0000] shrink-0" />
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">
                      {settings.mce_contact_heading}
                    </h3>
                  </div>
                  <div className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-700">
                    {settings.mce_contact_phone && (
                      <div className="flex items-center gap-[8px] sm:gap-[10px] mb-[8px] sm:mb-[10px]">
                        <span className="font-semibold text-gray-800">Phone:</span>
                        <span>{settings.mce_contact_phone}</span>
                      </div>
                    )}
                    <div className="space-y-[8px] text-gray-600">
                      {contactParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
