import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { GraduationCap, Trophy, Users, Target } from "lucide-react";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const deptLinks = [
  { label: "Central Administration", href: "/departments/central-administration" },
  { label: "Finance", href: "/departments/finance" },
  { label: "Education, Youth & Sports", href: "/departments/education" },
  { label: "Health", href: "/departments/health" },
  { label: "Agriculture", href: "/departments/agriculture" },
  { label: "Social Welfare", href: "/departments/social-welfare" },
  { label: "Works", href: "/departments/works" },
];

export default async function EducationPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: hod } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "education")
    .eq("is_active", true)
    .single();
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Education, Youth & Sports"
        breadcrumbs={[
          { label: "Departments", href: "/departments/central-administration" },
          { label: "Education, Youth & Sports" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Sidebar title="Departments" links={deptLinks} />
            </div>

            <div className="lg:col-span-3">              {hod && (
                <div className="mb-8 p-6 bg-gradient-to-r from-[#8B0000]/5 to-transparent rounded-lg border border-[#8B0000]/20">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Department Head</h3>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {hod.image_url && (
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-[#8B0000]">
                          <Image
                            src={hod.image_url}
                            alt={hod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">
                        {hod.title && <span>{hod.title} </span>}
                        {hod.name}
                      </h4>
                      <p className="text-[#8B0000] font-semibold mb-2">{hod.position}</p>
                      {hod.bio && <p className="text-gray-700 leading-relaxed">{hod.bio}</p>}
                    </div>
                  </div>
                </div>
              )}              <div className="prose max-w-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Education, Youth & Sports Department</h2>
                    <p className="text-[#8B0000] font-medium">Building the Future Through Education</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The Education, Youth and Sports Department is responsible for the promotion of quality education, youth development, and sporting activities within the Ga South Municipality. We work to ensure access to quality education and opportunities for young people.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#8B0000] p-6 rounded-lg text-center text-white">
                    <p className="text-3xl font-bold mb-1">156</p>
                    <p className="text-sm opacity-90">Public Basic Schools</p>
                  </div>
                  <div className="bg-[#8B0000] p-6 rounded-lg text-center text-white">
                    <p className="text-3xl font-bold mb-1">89</p>
                    <p className="text-sm opacity-90">Private Basic Schools</p>
                  </div>
                  <div className="bg-[#8B0000] p-6 rounded-lg text-center text-white">
                    <p className="text-3xl font-bold mb-1">12</p>
                    <p className="text-sm opacity-90">Senior High Schools</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Education Focus Areas</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• School supervision and monitoring</li>
                      <li>• Teacher welfare and development</li>
                      <li>• Infrastructure development</li>
                      <li>• School feeding programme</li>
                      <li>• Free SHS coordination</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Trophy className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Youth & Sports</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Youth employment programmes</li>
                      <li>• Sports facilities management</li>
                      <li>• Inter-school competitions</li>
                      <li>• Youth skills training</li>
                      <li>• Community sports events</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8B0000]/5 p-6 rounded-lg border-l-4 border-[#8B0000] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-[#8B0000]" />
                    <h3 className="text-lg font-bold text-gray-900">Key Programmes</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Ghana School Feeding Programme</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Free Senior High School</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>National Youth Employment Agency</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>TVET Support Programme</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> Municipal Education Office, Weija</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +233 (0) 302 907 143</p>
                  <p className="text-gray-600"><strong>Email:</strong> education@gsma.gov.gh</p>
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
