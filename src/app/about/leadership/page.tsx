import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const aboutLinks = [
  { label: "Overview", href: "/about/overview" },
  { label: "The Assembly", href: "/about/assembly" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "MCE Profile", href: "/about/mce-profile" },
  { label: "MCD Profile", href: "/about/mcd-profile" },
];

const staticLeaders = [
  {
    title: "Municipal Chief Executive",
    name: "Hon. Moses Kabu Kubi Ocansey",
    role: "MCE",
    href: "/about/mce-profile",
    description: "The Municipal Chief Executive is the political head of the Assembly and is responsible for the day-to-day performance of the executive and administrative functions of the Assembly.",
  },
  {
    title: "Municipal Coordinating Director",
    name: "Eugenia Akporhor Agbenyegah",
    role: "MCD",
    href: "/about/mcd-profile",
    description: "The Municipal Coordinating Director is the administrative head of the Assembly and is responsible for coordinating the activities of all departments of the Assembly.",
  },
];

export default async function LeadershipPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: departmentHeads } = await supabase
    .from("leadership")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Leadership"
        breadcrumbs={[
          { label: "About Us", href: "/about/overview" },
          { label: "Leadership" },
        ]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[20px] sm:gap-[24px] md:gap-[32px]">
            <div className="lg:col-span-1">
              <Sidebar title="About Us" links={aboutLinks} />
            </div>

            <div className="lg:col-span-3">
              <div className="mb-[28px] sm:mb-[32px] md:mb-[36px]">
                <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Our Leadership</h2>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                  The Ga South Municipal Assembly is led by dedicated public servants committed to the development and welfare of our community. Our leadership team works tirelessly to ensure efficient service delivery and sustainable development across the municipality.
                </p>
              </div>

              {/* Executive Leadership */}
              <div className="mb-[32px] sm:mb-[36px] md:mb-[40px]">
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px] pb-[12px] border-b-2 border-[#8B0000]">
                  Executive Leadership
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
                  {staticLeaders.map((leader) => (
                    <div key={leader.role} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="bg-gradient-to-br from-[#8B0000] to-[#6B0000] p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] text-center">
                        <div className="w-[88px] sm:w-[96px] md:w-[104px] h-[88px] sm:h-[96px] md:h-[104px] bg-white/20 rounded-full mx-auto mb-[12px] sm:mb-[14px] md:mb-[16px] flex items-center justify-center">
                          <span className="text-[26px] sm:text-[28px] md:text-[30px] font-bold text-white">{leader.role}</span>
                        </div>
                        <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-white">{leader.name}</h3>
                        <p className="text-[#ffcc00] text-[12px] sm:text-[13px] md:text-[14px]">{leader.title}</p>
                      </div>
                      <div className="p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px]">
                        <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[12px] sm:mb-[14px] md:mb-[16px]">{leader.description}</p>
                        <Link
                          href={leader.href}
                          className="inline-flex items-center gap-[8px] sm:gap-[10px] text-[#8B0000] font-semibold hover:gap-[12px] transition-all text-[13px] sm:text-[14px] md:text-[15px]"
                        >
                          View Full Profile
                          <ArrowRight className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Heads */}
              {departmentHeads && departmentHeads.length > 0 && (
                <div>
                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px] pb-[12px] border-b-2 border-[#8B0000]">
                    Department Heads
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[18px] md:gap-[20px]">
                    {departmentHeads.map((leader) => (
                      <div key={leader.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        {leader.image_url && (
                          <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden">
                            <Image
                              src={leader.image_url}
                              alt={leader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px]">
                          <h4 className="text-[14px] sm:text-[15px] md:text-[16px] font-bold text-gray-900">
                            {leader.title && <span>{leader.title} </span>}
                            {leader.name}
                          </h4>
                          <p className="text-[#8B0000] text-[12px] sm:text-[13px] md:text-[14px] font-semibold mb-[8px]">
                            {leader.position}
                          </p>
                          {leader.department && (
                            <p className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-500 mb-[10px] px-[8px] py-[4px] bg-gray-100 rounded inline-block">
                              {leader.department.replace(/-/g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            </p>
                          )}
                          {leader.bio && (
                            <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 leading-relaxed mt-[10px]">
                              {leader.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
