import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";
import { Award, Briefcase, GraduationCap, Quote } from "lucide-react";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "MCE Profile", href: "/about/mce-profile" },
  { label: "MCD Profile", href: "/about/mcd-profile" },
];

export default function MCEProfilePage() {
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
                      <Image
                        src="/mce-portrait.jpg"
                        alt="Hon. Moses Kabu Kubi Ocansey"
                        width={300}
                        height={400}
                        className="w-full h-auto rounded-lg object-cover"
                        priority
                      />
                      <div className="mt-[14px] sm:mt-[16px] md:mt-[18px]">
                        <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-white mb-[4px] sm:mb-[6px]">Hon. Moses Kabu Kubi Ocansey</h3>
                        <p className="text-[#ffcc00] text-[12px] sm:text-[13px] md:text-[14px] font-medium">Municipal Chief Executive</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Hon. Moses Kabu Kubi Ocansey</h2>
                    <p className="text-[#8B0000] text-[14px] sm:text-[15px] md:text-[16px] font-semibold mb-[16px] sm:mb-[18px] md:mb-[20px]">Municipal Chief Executive, Ga South Municipal Assembly</p>

                    <div className="bg-[#8B0000]/5 p-[12px] sm:p-[14px] md:p-[16px] lg:p-[18px] rounded-lg mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[24px] border-l-4 border-[#8B0000]">
                      <Quote className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-[#8B0000] mb-[8px] sm:mb-[10px]" />
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-700 italic">
                        &quot;Our commitment is to ensure that every resident of Ga South Municipality enjoys improved living standards through sustainable development, transparent governance, and efficient service delivery.&quot;
                      </p>
                    </div>

                    <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed mb-[16px] sm:mb-[18px] md:mb-[20px]">
                      Hon. Moses Kabu Kubi Ocansey was appointed as the Municipal Chief Executive of Ga South Municipal Assembly by His Excellency the President of the Republic of Ghana. He brings a wealth of experience in public administration and community development to the role.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] mb-[28px] sm:mb-[32px] md:mb-[36px]">
                  <div className="bg-gray-50 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                      <GraduationCap className="w-[28px] sm:w-[30px] md:w-[32px] h-[28px] sm:h-[30px] md:h-[32px] text-[#8B0000] shrink-0" />
                      <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">Education</h3>
                    </div>
                    <ul className="space-y-[10px] sm:space-y-[12px] md:space-y-[14px] text-[13px] sm:text-[14px] md:text-[15px] text-gray-600">
                      <li className="flex items-start gap-[8px] sm:gap-[10px]">
                        <span className="w-[6px] h-[6px] bg-[#8B0000] rounded-full mt-[6px] sm:mt-[7px] md:mt-[8px] shrink-0"></span>
                        <span>Master&apos;s Degree in Public Administration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full mt-2 shrink-0"></span>
                        <span>Bachelor&apos;s Degree in Political Science</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full mt-2 shrink-0"></span>
                        <span>Various Professional Certifications in Governance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                      <Briefcase className="w-[28px] sm:w-[30px] md:w-[32px] h-[28px] sm:h-[30px] md:h-[32px] text-[#8B0000] shrink-0" />
                      <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">Experience</h3>
                    </div>
                    <ul className="space-y-[10px] sm:space-y-[12px] md:space-y-[14px] text-[13px] sm:text-[14px] md:text-[15px] text-gray-600">
                      <li className="flex items-start gap-[8px] sm:gap-[10px]">
                        <span className="w-[6px] h-[6px] bg-[#8B0000] rounded-full mt-[6px] sm:mt-[7px] md:mt-[8px] shrink-0"></span>
                        <span>Over 15 years in public service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full mt-2 shrink-0"></span>
                        <span>Former District Assembly Member</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full mt-2 shrink-0"></span>
                        <span>Community Development Advocate</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#ffcc00]/10 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg">
                  <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px] mb-[14px] sm:mb-[16px] md:mb-[18px]">
                    <Award className="w-[28px] sm:w-[30px] md:w-[32px] h-[28px] sm:h-[30px] md:h-[32px] text-[#8B0000] shrink-0" />
                    <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-gray-900">Key Priorities</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[14px] md:gap-[16px]">
                    <div className="flex items-center gap-[8px] sm:gap-[10px]">
                      <span className="w-[6px] h-[6px] bg-[#8B0000] rounded-full shrink-0"></span>
                      <span className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-700">Infrastructure Development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span className="text-gray-700">Education Enhancement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span className="text-gray-700">Healthcare Improvement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span className="text-gray-700">Sanitation & Environment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span className="text-gray-700">Youth Employment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span className="text-gray-700">Revenue Mobilization</span>
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
