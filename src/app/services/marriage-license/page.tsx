import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingRows } from "@/lib/site-settings";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Heart,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MarriageLicensePage() {
  const settings = await loadPublicSiteSettings();
  const eligibility = settings.marriage_license_eligibility
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const requirements = settings.marriage_license_requirements
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const steps = splitSettingRows(settings.marriage_license_steps);
  const fees = splitSettingRows(settings.marriage_license_fees);
  const whereToApply = settings.marriage_license_where_to_apply
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Marriage License"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Marriage License" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Overview
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {settings.marriage_license_overview}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  (i) Ordinance Marriage (Cap 27)
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {settings.marriage_license_ordinance_body}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  (ii) Customary Marriage
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {settings.marriage_license_customary_body}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Eligibility Requirements
                </h2>
                <div className="bg-[#8B0000]/5 rounded-lg p-6 mb-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eligibility.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#8B0000]" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Required Documents
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <ul className="space-y-3">
                    {requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Application Process
                </h2>
                <div className="space-y-6 mb-8">
                  {steps.map(([title, description], index) => (
                    <div key={`${title}-${index}`} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Fee Structure
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#8B0000] text-white">
                        <th className="px-4 py-3 text-left font-semibold">
                          Service
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map(([service, amount], index) => (
                        <tr
                          key={`${service}-${index}`}
                          className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                          <td className="px-4 py-3 border-b border-gray-200">
                            {service}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 font-semibold text-[#8B0000]">
                            {amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 mb-1">
                        Important Notice
                      </h4>
                      <p className="text-amber-700 text-sm">
                        {settings.marriage_license_notice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#8B0000]" />
                  Quick Information
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Processing Time
                      </p>
                      <p className="text-gray-600 text-sm">
                        {settings.marriage_license_processing_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Where to Apply
                      </p>
                      <p className="text-gray-600 text-sm">
                        {whereToApply.map((line) => (
                          <span key={line}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Contact</p>
                      <p className="text-gray-600 text-sm">
                        {settings.marriage_license_contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                    Related Services
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/services/business-operating-permit"
                        className="text-[#8B0000] hover:underline text-sm"
                      >
                        Business Operating Permit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/building-permit"
                        className="text-[#8B0000] hover:underline text-sm"
                      >
                        Building Permit
                      </Link>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-white font-bold rounded hover:bg-[#6B0000] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
