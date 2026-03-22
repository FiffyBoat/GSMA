import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingLines } from "@/lib/site-settings";
import {
  ArrowRight,
  Briefcase,
  Building2,
  DollarSign,
  Heart,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const serviceCards = [
  {
    id: "business-operating-permit",
    title: "Business Operating Permit",
    icon: Briefcase,
    href: "/services/business-operating-permit",
    summaryKey: "business_permit_summary",
    processingTime: "5-10 working days",
  },
  {
    id: "marriage-license",
    title: "Marriage License",
    icon: Heart,
    href: "/services/marriage-license",
    summaryKey: "marriage_license_summary",
    processingTime: "21 days",
  },
  {
    id: "building-permit",
    title: "Building Permit",
    icon: Building2,
    href: "/services/building-permit",
    summaryKey: "building_permit_summary",
    processingTime: "14-45 days",
  },
  {
    id: "property-rates",
    title: "Property Rates",
    icon: DollarSign,
    href: "/services/property-rates",
    summaryKey: "property_rates_summary",
    processingTime: "Annual",
  },
  {
    id: "signage-permit",
    title: "Signage Permit",
    icon: Lightbulb,
    href: "/services/signage-permit",
    summaryKey: "signage_permit_summary",
    processingTime: "5-21 days",
  },
];

export default async function ServicesPage() {
  const settings = await loadPublicSiteSettings();
  const contactPhones = splitSettingLines(settings.contact_phone_lines);
  const contactHours = splitSettingLines(settings.contact_hours_lines);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader title="Our Services" breadcrumbs={[{ label: "Services" }]} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Services We Provide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings.services_intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100"
                >
                  <div className="p-8">
                    <div className="w-16 h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {settings[service.summaryKey]}
                    </p>
                    <p className="text-[#8B0000] text-sm font-medium mb-6">
                      Processing time: {service.processingTime}
                    </p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center text-[#8B0000] font-semibold hover:gap-3 gap-2 transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="h-1 bg-[#8B0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Need Assistance?
                </h3>
                <p className="text-gray-600 mb-6">
                  {settings.services_assistance_body}
                </p>
                <div className="space-y-2 text-gray-600">
                  {contactPhones[0] && (
                    <p>
                      <strong>Phone:</strong> {contactPhones.join(" / ")}
                    </p>
                  )}
                  <p>
                    <strong>Email:</strong> {settings.contact_email}
                  </p>
                  {contactHours[0] && (
                    <p>
                      <strong>Hours:</strong> {contactHours.join(" ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B0000] text-white font-bold rounded hover:bg-[#6B0000] transition-colors"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
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
