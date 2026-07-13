import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import ServiceShowMore from "@/components/shared/service-show-more";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import {
  splitSettingParagraphs,
  splitSettingRows,
} from "@/lib/site-settings";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuildingPermitPage() {
  const settings = await loadPublicSiteSettings();
  const overviewParagraphs = splitSettingParagraphs(
    settings.building_permit_overview
  );
  const permitTypes = splitSettingRows(settings.building_permit_types);
  const requirements = settings.building_permit_requirements
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const steps = splitSettingRows(settings.building_permit_steps);
  const fees = splitSettingRows(settings.building_permit_fees);
  const whereToApply = settings.building_permit_where_to_apply
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Building Permit"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Building Permit" },
        ]}
      />

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-[1200px] px-[15px]">
          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
              Municipal Service
            </p>
            <h2 className="mb-3 text-[26px] font-bold leading-tight text-gray-950 sm:text-[32px] md:text-[38px]">
              Building Permit
            </h2>
            <p className="max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px]">
              Review permit types, required documents, application steps, and office details before submitting.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Overview
                </h2>
                {overviewParagraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-6 leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                ))}

                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Types of Building Permits
                </h2>
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {permitTypes.map(([type, description, processingTime]) => (
                    <div
                      key={type}
                      className="rounded-[8px] border border-gray-200 border-l-4 border-l-[#8B0000] bg-gray-50 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Building2 className="mt-1 h-5 w-5 shrink-0 text-[#8B0000]" />
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{type}</h3>
                          <p className="text-sm text-gray-600">{description}</p>
                          <p className="mt-1 text-xs font-medium text-[#8B0000]">
                            Processing: {processingTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <ServiceShowMore collapsedLabel="Show documents, steps, and fees">
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
                            Building Category
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Fee Range
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees.map(([category, amount], index) => (
                          <tr
                            key={`${category}-${index}`}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            <td className="border-b border-gray-200 px-4 py-3">
                              {category}
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 font-semibold text-[#8B0000]">
                              {amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-8 rounded-[8px] border border-red-200 border-l-4 border-l-red-500 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div>
                        <h4 className="mb-1 font-bold text-red-800">
                          Warning: Building Without Permit
                        </h4>
                        <p className="text-sm text-red-700">
                          {settings.building_permit_warning}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 rounded-[8px] border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <div>
                        <h4 className="mb-1 font-bold text-amber-800">
                          Important Notice
                        </h4>
                        <p className="text-sm text-amber-700">
                          {settings.building_permit_notice}
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
                        {settings.building_permit_processing_time}
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
                        {settings.building_permit_contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 border-t border-gray-200 pt-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    Permit Validity
                  </h4>
                  <p className="text-sm text-gray-600">
                    {settings.building_permit_validity}
                  </p>
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
                        href="/services/marriage-license"
                        className="text-sm text-[#8B0000] hover:underline"
                      >
                        Marriage License
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
