import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import Sidebar from "@/components/shared/Sidebar";
import { Wallet, BarChart3, FileText, Target } from "lucide-react";
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

export default async function FinancePage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: hod } = await supabase
    .from("leadership")
    .select("*")
    .eq("department", "finance")
    .eq("is_active", true)
    .single();
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Finance Department"
        breadcrumbs={[
          { label: "Departments", href: "/departments/central-administration" },
          { label: "Finance" },
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
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Finance Department</h2>
                    <p className="text-[#8B0000] font-medium">Managing Financial Resources Responsibly</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  The Finance Department is responsible for the overall financial management of the Ga South Municipal Assembly. It ensures prudent financial management, revenue mobilization, and transparent utilization of public funds.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Core Functions</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Revenue collection and mobilization</li>
                      <li>• Budget preparation and management</li>
                      <li>• Financial reporting and accounting</li>
                      <li>• Payroll administration</li>
                      <li>• Procurement management</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-[#8B0000]" />
                      <h3 className="text-lg font-bold text-gray-900">Revenue Sources</h3>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Property rates and land rates</li>
                      <li>• Business operating permits</li>
                      <li>• Market tolls and fees</li>
                      <li>• Building permits</li>
                      <li>• Common fund allocations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#ffcc00]/10 p-6 rounded-lg border-l-4 border-[#ffcc00] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-[#8B0000]" />
                    <h3 className="text-lg font-bold text-gray-900">Payment Services</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Residents can make payments for the following services:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Property Rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Business Operating Permit</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Building Permit Fees</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                      <span>Market Stall Rent</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> GSMA Head Office, Weija</p>
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> +233 (0) 302 907 142</p>
                  <p className="text-gray-600"><strong>Email:</strong> finance@gsma.gov.gh</p>
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
