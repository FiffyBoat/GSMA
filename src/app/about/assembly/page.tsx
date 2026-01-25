import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import { Users, Building, Scale, FileText, User } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "MCE Profile", href: "/about/mce-profile" },
  { label: "MCD Profile", href: "/about/mcd-profile" },
];

export default async function AssemblyPage() {
  const supabase = await createServerSupabaseClient();

  const { data: electoralAreas } = await supabase
    .from("electoral_areas")
    .select("*, assembly_members(*)")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  const areas = electoralAreas || [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="The Assembly"
        breadcrumbs={[
          { label: "About Us", href: "/about/overview" },
          { label: "The Assembly" },
        ]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] sm:gap-[24px] md:gap-[32px]">
            <div className="lg:col-span-1">
              <Sidebar title="About Us" links={aboutLinks} />
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px]">The Ga South Municipal Assembly</h2>

                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed mb-[20px] sm:mb-[24px] md:mb-[28px]">
                  The Ga South Municipal Assembly is the highest political and administrative authority in the municipality. It is responsible for the overall development of the area and serves as a planning authority for the district. The Assembly exercises deliberative, legislative and executive functions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] mb-[28px] sm:mb-[32px] md:mb-[36px]">
                  <div className="bg-gray-50 p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] rounded-lg">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[16px] sm:mb-[18px] md:mb-[20px]">
                      <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-full flex items-center justify-center shrink-0">
                        <Users className="w-[22px] sm:w-[24px] md:w-[26px] h-[22px] sm:h-[24px] md:h-[26px] text-white" />
                      </div>
                      <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">Composition</h3>
                    </div>
                    <ul className="space-y-[8px] sm:space-y-[10px] md:space-y-[12px] text-[13px] sm:text-[14px] md:text-[15px] text-gray-600">
                      <li>• 25 Elected Assembly Members</li>
                      <li>• 13 Government Appointees</li>
                      <li>• 2 Members of Parliament</li>
                      <li>• Municipal Chief Executive (MCE)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] rounded-lg">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[16px] sm:mb-[18px] md:mb-[20px]">
                      <div className="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] bg-[#8B0000] rounded-full flex items-center justify-center shrink-0">
                        <Building className="w-[22px] sm:w-[24px] md:w-[26px] h-[22px] sm:h-[24px] md:h-[26px] text-white" />
                      </div>
                      <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">Sub-Committees</h3>
                    </div>
                    <ul className="space-y-[8px] sm:space-y-[10px] md:space-y-[12px] text-[13px] sm:text-[14px] md:text-[15px] text-gray-600">
                      <li>• Executive Committee</li>
                      <li>• Development Planning Sub-Committee</li>
                      <li>• Social Services Sub-Committee</li>
                      <li>• Finance & Administration Sub-Committee</li>
                      <li>• Works Sub-Committee</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Functions of the Assembly</h3>

                <div className="space-y-[12px] sm:space-y-[14px] md:space-y-[16px] mb-[28px] sm:mb-[32px] md:mb-[36px]">
                  <div className="flex gap-[12px] sm:gap-[14px] md:gap-[16px] p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] bg-white border border-gray-200 rounded-lg">
                    <Scale className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div>
                      <h4 className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] text-gray-900 mb-[6px] sm:mb-[8px]">Legislative Function</h4>
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">Enact bye-laws for the maintenance of peace, order, and good governance within the municipality.</p>
                    </div>
                  </div>

                  <div className="flex gap-[12px] sm:gap-[14px] md:gap-[16px] p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] bg-white border border-gray-200 rounded-lg">
                    <FileText className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div>
                      <h4 className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] text-gray-900 mb-[6px] sm:mb-[8px]">Executive Function</h4>
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">Implement policies and decisions made by the Assembly to ensure effective governance and service delivery.</p>
                    </div>
                  </div>

                  <div className="flex gap-[12px] sm:gap-[14px] md:gap-[16px] p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] bg-white border border-gray-200 rounded-lg">
                    <Users className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-[#8B0000] shrink-0 mt-[2px]" />
                    <div>
                      <h4 className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] text-gray-900 mb-[6px] sm:mb-[8px]">Deliberative Function</h4>
                      <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">Discuss and deliberate on issues concerning the welfare of the municipality and its residents.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Administrative Structure</h3>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                  The Assembly operates through a coordinated structure comprising various departments including Central Administration, Finance, Physical Planning, Works, Agriculture, Health, Education, Social Welfare, and Community Development. Each department is headed by a professional head who reports to the Municipal Coordinating Director.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {areas.length > 0 && (
        <section className="py-[40px] sm:py-[60px] md:py-[80px] bg-gray-50">
          <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
            <div className="mb-[32px] sm:mb-[40px] md:mb-[48px]">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 mb-[12px] sm:mb-[14px]">Assembly Members by Electoral Area</h2>
              <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px]">
                Meet the elected and appointed representatives of Ga South Municipality
              </p>
            </div>

            <div className="space-y-[40px] sm:space-y-[48px] md:space-y-[56px]">
              {areas.map((area) => (
                <div key={area.id}>
                  <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px] pb-[16px] sm:pb-[18px] md:pb-[20px] border-b-[2px] border-[#8B0000]">
                    {area.name}
                  </h3>
                  
                  {area.assembly_members && area.assembly_members.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[24px] md:gap-[28px]">
                      {area.assembly_members
                        .filter((member: any) => member.is_active)
                        .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
                        .map((member: any) => (
                          <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                            {member.image_url ? (
                              <div className="relative h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden">
                                <Image
                                  src={member.image_url}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-[200px] sm:h-[220px] md:h-[240px] bg-gradient-to-br from-[#8B0000] to-[#6B0000] flex items-center justify-center">
                                <User className="w-[60px] sm:w-[70px] md:w-[80px] h-[60px] sm:h-[70px] md:h-[80px] text-white/30" />
                              </div>
                            )}
                            <div className="p-[16px] sm:p-[18px] md:p-[20px]">
                              <h4 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900 mb-[8px] sm:mb-[10px]">
                                {member.name}
                              </h4>
                              {member.position && (
                                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#8B0000] font-semibold mb-[12px] sm:mb-[14px]">
                                  {member.position}
                                </p>
                              )}
                              {member.bio && (
                                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[12px] sm:mb-[14px] line-clamp-3">
                                  {member.bio}
                                </p>
                              )}
                              {(member.contact_email || member.contact_phone) && (
                                <div className="pt-[12px] sm:pt-[14px] border-t border-gray-200 space-y-[6px]">
                                  {member.contact_email && (
                                    <a href={`mailto:${member.contact_email}`} className="text-[11px] sm:text-[12px] md:text-[13px] text-[#8B0000] hover:underline block truncate">
                                      {member.contact_email}
                                    </a>
                                  )}
                                  {member.contact_phone && (
                                    <a href={`tel:${member.contact_phone}`} className="text-[11px] sm:text-[12px] md:text-[13px] text-[#8B0000] hover:underline block">
                                      {member.contact_phone}
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-[13px] sm:text-[14px] md:text-[15px] italic">No members assigned to this electoral area yet.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
