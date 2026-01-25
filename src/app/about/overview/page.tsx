import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Eye, Target, Users, MapPin } from "lucide-react";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "MCE Profile", href: "/about/mce-profile" },
  { label: "MCD Profile", href: "/about/mcd-profile" },
];

export default function OverviewPage() {
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
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px]">About Ga South Municipal Assembly</h2>
                
                <p className="text-gray-600 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] mb-[20px] sm:mb-[24px] text-[13px] sm:text-[14px] md:text-[15px]">
                  The Ga South Municipal Assembly (GSMA) is one of the twenty-nine (29) administrative districts in the Greater Accra Region of Ghana. The Assembly was created by Legislative Instrument (L.I. 2137) in 2012 when the then Ga South District was upgraded to a Municipal status. The Municipality is located at the south-western part of the Greater Accra Region.
                </p>

                <p className="text-gray-600 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] mb-[24px] sm:mb-[28px] md:mb-[32px] text-[13px] sm:text-[14px] md:text-[15px]">
                  The Assembly is responsible for the overall development of the municipality and ensuring the provision of basic services to its residents. The administrative capital is Weija, and the municipality covers an area of approximately 341 square kilometers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  <div className="bg-[#8B0000]/5 p-[16px] sm:p-[20px] md:p-[24px] rounded-lg border-l-4 border-[#8B0000]">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] mb-[12px] sm:mb-[14px]">
                      <Eye className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000]" />
                      <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6]">
                      To become a well-developed municipality with improved living standards for all residents through sustainable development initiatives.
                    </p>
                  </div>

                  <div className="bg-[#ffcc00]/10 p-[16px] sm:p-[20px] md:p-[24px] rounded-lg border-l-4 border-[#ffcc00]">
                    <div className="flex items-center gap-[12px] sm:gap-[14px] mb-[12px] sm:mb-[14px]">
                      <Target className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000]" />
                      <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <p className="text-gray-600 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6]">
                      To improve the quality of life of the people through participatory governance, efficient service delivery, and sustainable development.
                    </p>
                  </div>
                </div>

                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Key Facts</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[14px] md:gap-[16px] lg:gap-[18px] mb-[24px] sm:mb-[28px] md:mb-[32px]">
                  <div className="bg-white border border-gray-200 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg text-center">
                    <MapPin className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000] mx-auto mb-[8px] sm:mb-[10px]" />
                    <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#8B0000]">341 km²</p>
                    <p className="text-gray-500 text-[11px] sm:text-[12px] md:text-[13px]">Total Land Area</p>
                  </div>
                  <div className="bg-white border border-gray-200 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg text-center">
                    <Users className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000] mx-auto mb-[8px] sm:mb-[10px]" />
                    <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#8B0000]">485,643</p>
                    <p className="text-gray-500 text-[11px] sm:text-[12px] md:text-[13px]">Population (2021 Census)</p>
                  </div>
                  <div className="bg-white border border-gray-200 p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg text-center">
                    <Users className="w-[32px] sm:w-[36px] h-[32px] sm:h-[36px] text-[#8B0000] mx-auto mb-[8px] sm:mb-[10px]" />
                    <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#8B0000]">25</p>
                    <p className="text-gray-500 text-[11px] sm:text-[12px] md:text-[13px]">Electoral Areas</p>
                  </div>
                </div>

                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Location & Boundaries</h3>
                <p className="text-gray-600 leading-[1.6] sm:leading-[1.7] md:leading-[1.8] text-[13px] sm:text-[14px] md:text-[15px]">
                  The Ga South Municipality shares boundaries with Weija-Gbawe Municipal to the East, Ga Central Municipal to the North-East, Ga West Municipal to the North, Awutu Senya East District to the West, and the Gulf of Guinea to the South. The strategic location of the municipality makes it a hub for residential, commercial, and industrial activities.
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
