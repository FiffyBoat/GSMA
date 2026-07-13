import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
import PageHeader from "@/components/shared/PageHeader";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import { splitSettingLines } from "@/lib/site-settings";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  Heart,
  Lightbulb,
  Mail,
  Phone,
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

      <section className="bg-[#f7f8fa] py-[44px] sm:py-[64px] md:py-[88px]">
        <div className="container mx-auto max-w-[1200px] px-[15px]">
          <div className="mb-[28px] grid gap-6 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:mb-[34px] md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                Public Services
              </p>
              <h2 className="mb-4 text-[26px] font-bold leading-tight text-gray-950 sm:text-[32px] md:text-[38px]">
                Services We Provide
              </h2>
              <p className="max-w-3xl text-[14px] leading-7 text-gray-600 sm:text-[15px]">
              {settings.services_intro}
            </p>
            </div>
            <div className="rounded-[6px] border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 text-[18px] font-bold text-gray-950">
                Need Assistance?
              </h3>
              <p className="mb-4 text-[14px] leading-6 text-gray-600">
                {settings.services_assistance_body}
              </p>
              <div className="space-y-3 text-[13px] text-gray-700">
                {contactPhones[0] ? (
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#8B0000]" />
                    <span>{contactPhones.join(" / ")}</span>
                  </div>
                ) : null}
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#8B0000]" />
                  <span>{settings.contact_email}</span>
                </div>
                {contactHours[0] ? (
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8B0000]" />
                    <span>{contactHours.join(" ")}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8B0000]/25 hover:shadow-[0_18px_36px_rgba(16,24,40,0.12)] focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2"
                >
                  <div className="flex h-full flex-col p-5 sm:p-6">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#8B0000] text-white transition-transform duration-300 group-hover:scale-105">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold text-gray-600">
                        {service.processingTime}
                      </span>
                    </div>
                    <h3 className="mb-3 text-[19px] font-bold text-gray-950">
                      {service.title}
                    </h3>
                    <p className="mb-5 line-clamp-4 text-[14px] leading-7 text-gray-600">
                      {settings[service.summaryKey]}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[#8B0000] transition-all duration-300 group-hover:gap-3">
                      View requirements
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="h-1 origin-left scale-x-0 bg-[#8B0000] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </div>

          <div className="mt-8 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7 md:mt-10 md:p-8">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="mb-3 text-[22px] font-bold text-gray-950">
                  Start with the right office
                </h3>
                <p className="max-w-3xl text-[14px] leading-7 text-gray-600">
                  Select a service to view requirements, fees, steps, and office
                  contacts before visiting the Assembly.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#8B0000] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6B0000]"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
