import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import ServiceShowMore from "@/components/shared/service-show-more";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingLines, splitSettingRows } from "@/lib/site-settings";
import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { includesLooseText } from "@/lib/text-match";
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
  const latestFeeFixingDoc = feeFixingDocs[0] ?? null;
  const archivedFeeFixingDocs = feeFixingDocs.slice(1);

  const getDocumentReferenceHref = (documentId: string) => {
    const documentIndex = (documents || []).findIndex((doc) => doc.id === documentId);

    if (documentIndex === -1) {
      return "/documents";
    }

    const archivePage = Math.floor(documentIndex / 9) + 1;
    return `/documents?page=${archivePage}&doc=${documentId}#document-${documentId}`;
  };

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

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-[1200px] px-[15px]">
          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
              Municipal Service
            </p>
            <h2 className="mb-3 text-[26px] font-bold leading-tight text-gray-950 sm:text-[32px] md:text-[38px]">
              Business Operating Permit
            </h2>
            <p className="max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px]">
              Review the process, requirements, fees, and office details before applying.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  General Information
                </h2>
                {overviewParagraphs.map((paragraph, index) => (
                  <p
                    key={`${paragraph}-${index}`}
                    className="mb-6 leading-relaxed text-gray-600"
                  >
                    {paragraph}
                  </p>
                ))}

                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Processes to Obtain a Business Operating Permit
                </h2>
                <div className="mb-8 rounded-[8px] border border-gray-200 bg-gray-50 p-6">
                  <ol className="list-inside list-decimal space-y-3">
                    {processSteps.map((step) => (
                      <li key={step} className="text-gray-700">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <ServiceShowMore collapsedLabel="Show requirements, fees, and more">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Apply for a Business License
                  </h2>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {settings.business_permit_apply}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Business Changes & Closures
                  </h2>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {settings.business_permit_changes}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Business License Renewals
                  </h2>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {settings.business_permit_renewals}
                  </p>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Mode of Payment
                  </h2>
                  <div className="mb-8 rounded-[8px] border border-gray-200 bg-gray-50 p-6">
                    <ul className="space-y-2">
                      {paymentModes.map((mode) => (
                        <li
                          key={mode}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#8B0000]"></span>
                          {mode}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Requirements
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
                    Fee Structure
                  </h2>
                  <div className="mb-8 overflow-x-auto">
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

                  <div className="mb-8 rounded-[8px] border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <div>
                        <h4 className="mb-1 font-bold text-amber-800">
                          Important Notice
                        </h4>
                        <p className="text-sm text-amber-700">
                          {settings.business_permit_notice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Fee Fixing
                  </h2>
                  {latestFeeFixingDoc ? (
                    <div className="mb-8 space-y-5">
                      <div className="rounded-[8px] border border-[#8B0000]/15 bg-[#fff8f2] p-5">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B0000]">
                          Current Fee Fixing Document
                        </p>
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="mb-2 font-bold text-gray-900">
                                {latestFeeFixingDoc.title}
                              </h3>
                              <p className="mb-4 text-sm text-gray-600">
                                {latestFeeFixingDoc.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <FileText className="h-4 w-4" />
                                <span>{latestFeeFixingDoc.file_type.toUpperCase()}</span>
                                <span>-</span>
                                <span>
                                  {(latestFeeFixingDoc.file_size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                            <a
                              href={latestFeeFixingDoc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 whitespace-nowrap rounded bg-[#8B0000] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#6B0000]"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>

                      {archivedFeeFixingDocs.length > 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                          <p className="mb-3 text-sm font-semibold text-gray-900">
                            Previous Fee Fixing Documents
                          </p>
                          <ul className="space-y-3">
                            {archivedFeeFixingDocs.map((doc) => (
                              <li
                                key={doc.id}
                                className="rounded-lg border border-gray-200 bg-white px-4 py-3"
                              >
                                <Link
                                  href={getDocumentReferenceHref(doc.id)}
                                  className="font-semibold text-[#8B0000] hover:underline"
                                >
                                  {doc.title}
                                </Link>
                                {doc.description ? (
                                  <p className="mt-1 mb-0 text-sm text-gray-600">
                                    {doc.description}
                                  </p>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                  <div className="mb-8 rounded-[8px] border border-yellow-200 border-l-4 border-l-yellow-500 bg-yellow-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                        <div>
                          <h4 className="mb-1 font-bold text-yellow-800">
                            Fee Document Coming Soon
                          </h4>
                          <p className="text-sm text-yellow-700">
                            The detailed fee fixing document is being prepared and
                            will be available shortly. Please check back soon or
                            contact the Revenue Unit for more information.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
                        {settings.business_permit_processing_time}
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
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Office Hours
                      </p>
                      <p className="text-sm text-gray-600">
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
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Contact</p>
                      <p className="text-sm text-gray-600">
                        {settings.business_permit_contact}
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
                        href="/services/building-permit"
                        className="text-sm text-[#8B0000] hover:underline"
                      >
                        Building Permit
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
