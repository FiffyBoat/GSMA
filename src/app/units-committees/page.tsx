import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSemicolonValues, splitSettingRows } from "@/lib/site-settings";
import {
  Briefcase,
  Building2,
  FileCheck,
  Gavel,
  Scale,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

const committeeIcons = [Briefcase, Building2, Users, Scale, FileCheck, Gavel];

export default async function UnitsCommitteesPage() {
  const settings = await loadPublicSiteSettings();
  const committees = splitSettingRows(settings.units_committee_items).map(
    ([name, description, members, responsibilities]) => ({
      name,
      description,
      members,
      responsibilities: splitSemicolonValues(responsibilities),
    })
  );
  const specialUnits = splitSettingRows(settings.units_special_unit_items).map(
    ([name, description]) => ({ name, description })
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Units & Committees"
        breadcrumbs={[{ label: "Units & Committees" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          <div className="max-w-3xl mb-[36px] sm:mb-[44px] md:mb-[52px]">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">
              Sub-Committees of the Assembly
            </h2>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
              {settings.units_intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
            {committees.map((committee, index) => {
              const Icon = committeeIcons[index] ?? Users;
              return (
                <div
                  key={committee.name}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#8B0000] px-[16px] sm:px-[18px] md:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] md:py-[16px] lg:py-[18px] flex items-center gap-[12px] sm:gap-[14px]">
                    <Icon className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-white shrink-0" />
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-white">
                      {committee.name}
                    </h3>
                  </div>
                  <div className="p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px]">
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[12px] sm:mb-[14px] md:mb-[16px]">
                      {committee.description}
                    </p>
                    <p className="text-[12px] sm:text-[13px] md:text-[14px] mb-[12px] sm:mb-[14px] md:mb-[16px]">
                      <span className="font-semibold text-gray-900">
                        Composition:{" "}
                      </span>
                      <span className="text-gray-600">{committee.members}</span>
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900 text-[12px] sm:text-[13px] md:text-[14px] mb-[8px] sm:mb-[10px]">
                        Key Responsibilities:
                      </p>
                      <ul className="space-y-[6px] sm:space-y-[8px]">
                        {committee.responsibilities.map((responsibility) => (
                          <li
                            key={responsibility}
                            className="flex items-start gap-[8px] sm:gap-[10px] text-[12px] sm:text-[13px] md:text-[14px] text-gray-600"
                          >
                            <span className="w-[5px] h-[5px] bg-[#8B0000] rounded-full mt-[4px] sm:mt-[5px] shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-[44px] sm:mt-[52px] md:mt-[60px] lg:mt-[72px] bg-gray-50 p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] rounded-lg">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px]">
              {settings.units_special_units_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] sm:gap-[16px] md:gap-[18px] lg:gap-[20px]">
              {specialUnits.map((unit) => (
                <div
                  key={unit.name}
                  className="bg-white p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg border border-gray-200"
                >
                  <h3 className="font-bold text-gray-900 text-[14px] sm:text-[15px] md:text-[16px] mb-[8px] sm:mb-[10px]">
                    {unit.name}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">
                    {unit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
