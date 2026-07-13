import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import ServiceShowMore from "@/components/shared/service-show-more";
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

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-[1200px] px-[15px]">
          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
              Municipal Service
            </p>
            <h2 className="mb-3 text-[26px] font-bold leading-tight text-gray-950 sm:text-[32px] md:text-[38px]">
              Marriage License
            </h2>
            <p className="max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px]">
              Review eligibility, marriage types, required documents, fees, and office details.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Overview
                </h2>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {settings.marriage_license_overview}
                </p>

                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Eligibility Requirements
                </h2>
                <div className="mb-8 rounded-[8px] border border-[#8B0000]/10 bg-[#8B0000]/5 p-6">
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {eligibility.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-[#8B0000]" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ServiceShowMore collapsedLabel="Show marriage types, documents, and fees">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    (i) Ordinance Marriage (Cap 27)
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {settings.marriage_license_ordinance_body}
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    (ii) Customary Marriage
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {settings.marriage_license_customary_body}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Required Documents
                  </h2>
                  <div className="mb-8 rounded-[8px] border border-gray-200 bg-gray-50 p-6">
                    <ul className="space-y-3">
                      {requirements.map((requirement) => (
                        <li key={requirement} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#8B0000]" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Application Process
                  </h2>
                  <div className="mb-8 space-y-6">
                    {steps.map(([title, description], index) => (
                      <div key={`${title}-${index}`} className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B0000] font-bold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="mb-1 font-bold text-gray-900">{title}</h3>
                          <p className="text-gray-600">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Fee Structure
                  </h2>
                  <div className="mb-8 overflow-x-auto">
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
                            <td className="border-b border-gray-200 px-4 py-3">
                              {service}
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 font-semibold text-[#8B0000]">
                              {amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-8 rounded-[8px] border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <div>
                        <h4 className="mb-1 font-bold text-amber-800">
                          Important Notice
                        </h4>
                        <p className="text-sm text-amber-700">
                          {settings.marriage_license_notice}
                        </p>
                      </div>
                    </div>
                  </div>
                </ServiceShowMore>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-[8px] border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                  <FileText className="h-5 w-5 text-[#8B0000]" />
                  Quick Information
                </h3>

                <div className="mb-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Processing Time
                      </p>
                      <p className="text-sm text-gray-600">
                        {settings.marriage_license_processing_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Where to Apply
                      </p>
                      <p className="text-sm text-gray-600">
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
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Contact</p>
                      <p className="text-sm text-gray-600">
                        {settings.marriage_license_contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    Related Services
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/services/business-operating-permit"
                        className="text-sm text-[#8B0000] hover:underline"
                      >
                        Business Operating Permit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/building-permit"
                        className="text-sm text-[#8B0000] hover:underline"
                      >
                        Building Permit
                      </Link>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#8B0000] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6B0000]"
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
