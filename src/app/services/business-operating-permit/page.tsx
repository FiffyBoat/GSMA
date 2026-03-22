import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { includesLooseText } from "@/lib/text-match";
import { splitSettingLines, splitSettingRows } from "@/lib/site-settings";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function matchesFeeFixingDocument(value?: string | null) {
  return includesLooseText(value, "fee fixing");
}

export default async function BusinessOperatingPermitPage() {
  const settings = await loadPublicSiteSettings();
  const supabase = createPublicServerSupabaseClient();
  const { data: documents } = await supabase
    .from("documents")
    .select(
      "id, title, description, file_url, file_type, category, file_size, is_published, uploaded_date"
    )
    .eq("is_published", true)
    .order("uploaded_date", { ascending: false });
  const feeFixingDocs = (documents || []).filter(
    (doc) =>
      matchesFeeFixingDocument(doc.category) ||
      matchesFeeFixingDocument(doc.title) ||
      matchesFeeFixingDocument(doc.description)
  );

  const overviewParagraphs = settings.business_permit_overview
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const processSteps = splitSettingLines(settings.business_permit_process);
  const paymentModes = splitSettingLines(settings.business_permit_payment_modes);
  const requirements = splitSettingLines(settings.business_permit_requirements);
  const fees = splitSettingRows(settings.business_permit_fees);
  const whereToApply = splitSettingLines(settings.business_permit_where_to_apply);
  const officeHours = splitSettingLines(settings.business_permit_office_hours);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Business Operating Permit"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Business Operating Permit" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  General Information
                </h2>
                {overviewParagraphs.map((paragraph, index) => (
                  <p
                    key={`${paragraph}-${index}`}
                    className="text-gray-600 mb-6 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Processes to Obtain a Business Operating Permit
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <ol className="space-y-3 list-decimal list-inside">
                    {processSteps.map((step) => (
                      <li key={step} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Apply for a Business License
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {settings.business_permit_apply}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Business Changes & Closures
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {settings.business_permit_changes}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Business License Renewals
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {settings.business_permit_renewals}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Mode of Payment
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <ul className="space-y-2">
                    {paymentModes.map((mode) => (
                      <li
                        key={mode}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full"></span>
                        {mode}
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Requirements
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
                  Fee Structure
                </h2>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#8B0000] text-white">
                        <th className="px-4 py-3 text-left font-semibold">
                          Business Category
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
                          <td className="px-4 py-3 border-b border-gray-200">
                            {category}
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
                        {settings.business_permit_notice}
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Fee Fixing
                </h2>
                {feeFixingDocs && feeFixingDocs.length > 0 ? (
                  <div className="space-y-4 mb-8">
                    {feeFixingDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">
                              {doc.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                              {doc.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FileText className="w-4 h-4" />
                              <span>{doc.file_type.toUpperCase()}</span>
                              <span>•</span>
                              <span>
                                {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-4 py-2 bg-[#8B0000] text-white rounded font-semibold hover:bg-[#6B0000] transition-colors whitespace-nowrap"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-1">
                          Fee Document Coming Soon
                        </h4>
                        <p className="text-yellow-700 text-sm">
                          The detailed fee fixing document is being prepared and
                          will be available shortly. Please check back soon or
                          contact the Revenue Unit for more information.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                        {settings.business_permit_processing_time}
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
                    <Clock className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Office Hours
                      </p>
                      <p className="text-gray-600 text-sm">
                        {officeHours.map((line) => (
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
                        {settings.business_permit_contact}
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
                        href="/services/building-permit"
                        className="text-[#8B0000] hover:underline text-sm"
                      >
                        Building Permit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/marriage-license"
                        className="text-[#8B0000] hover:underline text-sm"
                      >
                        Marriage License
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
