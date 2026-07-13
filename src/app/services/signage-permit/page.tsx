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
  Lightbulb,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SignagePermitPage() {
  const settings = await loadPublicSiteSettings();
  const overviewParagraphs = settings.signage_permit_overview
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const signageTypes = splitSettingRows(settings.signage_permit_types);
  const requirements = settings.signage_permit_requirements
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const steps = splitSettingRows(settings.signage_permit_steps);
  const regulations = settings.signage_permit_regulations
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const fees = splitSettingRows(settings.signage_permit_fees);
  const assistanceLines = settings.signage_permit_assistance_body
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const notes = settings.signage_permit_important_notes
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Signage Permit"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Signage Permit" },
        ]}
      />

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-5xl px-[15px]">
          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
              Municipal Service
            </p>
            <h2 className="mb-4 text-[26px] font-bold leading-tight text-gray-950 sm:text-[32px] md:text-[38px]">
              About Signage Permits
            </h2>
            {overviewParagraphs.map((paragraph, index) => (
              <p
                key={`${paragraph}-${index}`}
                className="mb-4 leading-relaxed text-gray-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Types of Signage
            </h3>
            <div className="grid gap-4">
              {signageTypes.map(([type, description, processingTime]) => (
                <div
                  key={type}
                  className="rounded-[8px] border border-gray-200 bg-gray-50 p-6"
                >
                  <h4 className="mb-2 text-lg font-bold text-gray-900">{type}</h4>
                  <p className="mb-3 text-gray-600">{description}</p>
                  <div className="flex items-center gap-2 font-semibold text-[#8B0000]">
                    <Clock className="h-4 w-4" />
                    Processing Time: {processingTime}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:p-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Need detailed guidance?
            </h3>
            <ServiceShowMore
              className="mb-0"
              collapsedLabel="Show documents, regulations, fees, and support"
            >
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Documentation Requirements
              </h3>
              <div className="mb-8 rounded-[8px] border border-gray-200 bg-gray-50 p-6">
                <ul className="space-y-3">
                  {requirements.map((requirement) => (
                    <li key={requirement} className="flex gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8B0000]" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Application Process
              </h3>
              <div className="mb-8 space-y-4">
                {steps.map(([title, description], index) => (
                  <div key={`${title}-${index}`} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B0000] font-bold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 text-lg font-bold text-gray-900">
                        {title}
                      </h4>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Signage Regulations
              </h3>
              <div className="mb-8 rounded-[8px] border border-yellow-200 bg-yellow-50 p-6">
                <ul className="space-y-3">
                  {regulations.map((regulation) => (
                    <li key={regulation} className="flex gap-3">
                      <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                      <span className="text-gray-700">{regulation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Permit Fees
              </h3>
              <div className="mb-8 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#8B0000] text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left">
                        Signage Category
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left">
                        Estimated Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map(([category, amount], index) => (
                      <tr
                        key={`${category}-${index}`}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="border border-gray-300 px-4 py-3 text-gray-900">
                          {category}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold text-[#8B0000]">
                          {amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-8 rounded-[8px] border border-[#8B0000]/20 bg-gradient-to-r from-[#8B0000]/5 to-transparent p-8">
                <h3 className="mb-6 text-2xl font-bold text-gray-900">
                  Need Assistance?
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex gap-3">
                    <Phone className="h-6 w-6 flex-shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {assistanceLines[0] ?? "Development Planning Department"}
                      </p>
                      <p className="text-gray-600">
                        {assistanceLines[1] ?? "For signage permit applications"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-6 w-6 flex-shrink-0 text-[#8B0000]" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {assistanceLines[2] ?? "Planning Office"}
                      </p>
                      <p className="text-gray-600">
                        {assistanceLines[3] ?? "Municipal Assembly Headquarters"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[8px] border border-amber-200 bg-amber-50 p-6">
                <h4 className="mb-3 flex gap-2 font-bold text-gray-900">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
                  Important Information
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {notes.map((note) => (
                    <li key={note}>- {note}</li>
                  ))}
                </ul>
              </div>
            </ServiceShowMore>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000] hover:underline"
          >
            Back to Services
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
