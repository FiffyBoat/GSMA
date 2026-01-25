import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Building, Users, FileText, Target } from "lucide-react";
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

export default async function CentralAdminPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: hod } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "central-administration")
    .eq("is_active", true)
    .single();
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Central Administration"
        breadcrumbs={[
          { label: "Departments", href: "/departments/central-administration" },
          { label: "Central Administration" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Sidebar title="Departments" links={deptLinks} />
            </div>

            <div className="lg:col-span-3">
              {hod && (
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
              )}
              <div className="prose max-w-none">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Central Administration Department</h2>
                    <p className="text-[#8B0000] font-medium">Coordinating the Assembly's Administrative Functions</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The Central Administration Department serves as the hub for all administrative activities of the Ga South Municipal Assembly. It coordinates the activities of all departments and ensures the smooth running of the Assembly's operations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Core Functions</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• General administration and coordination</li>
                      <li>• Human resource management</li>
                      <li>• Records and archives management</li>
                      <li>• Protocol and public relations</li>
                      <li>• Secretariat services to the Assembly</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Key Personnel</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Municipal Coordinating Director</li>
                      <li>• Deputy Coordinating Director</li>
                      <li>• Human Resource Manager</li>
                      <li>• Public Relations Officer</li>
                      <li>• Administrative Officers</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#8B0000]/5 p-6 rounded-lg border-l-4 border-[#8B0000] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-[#8B0000]" />
                    <h3 className="text-lg font-bold text-gray-900">Services Provided</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Staff recruitment and management</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Policy formulation and implementation</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Coordination of departmental activities</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Public complaints handling</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Assembly meetings coordination</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Intergovernmental relations</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> GSMA Head Office, Weija</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +233 (0) 302 907 141</p>
                  <p className="text-gray-600"><strong>Email:</strong> admin@gsma.gov.gh</p>
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
