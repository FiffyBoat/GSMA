"use client";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { Briefcase, Heart, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "business-operating-permit",
    title: "Business Operating Permit",
    description: "Register your business and obtain the necessary permits to operate legally within the Ga South Municipality. This permit is mandatory for all businesses and must be renewed annually.",
    icon: Briefcase,
    href: "/services/business-operating-permit",
    processingTime: "5-10 working days",
  },
  {
    id: "marriage-license",
    title: "Marriage License",
    description: "Apply for an official marriage license to legally solemnize your union at the Ga South Municipal Assembly. The Assembly also provides facilities for civil marriage ceremonies.",
    icon: Heart,
    href: "/services/marriage-license",
    processingTime: "21 days",
  },
  {
    id: "building-permit",
    title: "Building Permit",
    description: "Obtain approval for construction, renovation, or demolition projects within the municipality. This permit ensures compliance with local building codes and safety standards.",
    icon: Building2,
    href: "/services/building-permit",
    processingTime: "14-45 days",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Our Services"
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services We Provide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The Ga South Municipal Assembly provides essential services to residents and businesses. 
              Click on any service below to learn more about the requirements and application process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
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
                      {service.description}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Assistance?</h3>
                <p className="text-gray-600 mb-6">
                  Our customer service team is available to help you with any questions 
                  about our services. Visit our office or contact us for more information.
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Phone:</strong> +233 (0)30 290 8466/7</p>
                  <p><strong>Email:</strong> info@gsma.gov.gh</p>
                  <p><strong>Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
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
