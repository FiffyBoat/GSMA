import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingRows } from "@/lib/site-settings";
import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PropertyRatesPage() {
  const settings = await loadPublicSiteSettings();
  const overviewParagraphs = settings.property_rates_overview
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const categories = splitSettingRows(settings.property_rates_categories);
  const requirements = settings.property_rates_requirements
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const steps = splitSettingRows(settings.property_rates_steps);
  const paymentMethods = splitSettingRows(settings.property_rates_payment_methods);
  const importantNotes = settings.property_rates_important_notes
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const assistanceLines = settings.property_rates_assistance_body
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Property Rates"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Property Rates" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About Property Rates
            </h2>
            {overviewParagraphs.map((paragraph, index) => (
              <p
                key={`${paragraph}-${index}`}
                className="text-gray-600 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Property Categories
            </h3>
            <div className="grid gap-4">
              {categories.map(([type, description, rate]) => (
                <div
                  key={type}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{type}</h4>
                  <p className="text-gray-600 mb-3">{description}</p>
                  <p className="text-[#8B0000] font-semibold">Rate: {rate}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Documentation Requirements
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <ul className="space-y-3">
                {requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Application Process
            </h3>
            <div className="space-y-4">
              {steps.map(([title, description], index) => (
                <div key={`${title}-${index}`} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#8B0000] text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {title}
                    </h4>
                    <p className="text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Payment Methods
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {paymentMethods.map(([method, details]) => (
                <div
                  key={method}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{method}</h4>
                  <p className="text-gray-600">{details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#8B0000]/5 to-transparent p-8 rounded-lg border border-[#8B0000]/20 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Need Assistance?
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex gap-3">
                <Phone className="w-6 h-6 text-[#8B0000] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {assistanceLines[0] ?? "Finance Department"}
                  </p>
                  <p className="text-gray-600">
                    {assistanceLines[1] ?? "For rate inquiries and payment"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-6 h-6 text-[#8B0000] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {assistanceLines[2] ?? "Finance Office"}
                  </p>
                  <p className="text-gray-600">
                    {assistanceLines[3] ?? "Municipal Assembly Headquarters"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-12">
            <h4 className="font-bold text-gray-900 mb-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              Important Information
            </h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              {importantNotes.map((note) => (
                <li key={note}>- {note}</li>
              ))}
            </ul>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#8B0000] font-semibold hover:underline"
          >
            Back to Services
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
