"use client";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { FileText, Clock, CheckCircle, AlertCircle, Phone, MapPin, Building2 } from "lucide-react";
import Link from "next/link";

export default function BuildingPermitPage() {
  const requirements = [
    "Completed building permit application form",
    "Valid National ID (Ghana Card)",
    "Proof of land ownership (land title, deed of assignment, etc.)",
    "Architectural drawings (site plan, floor plans, elevations, sections)",
    "Structural drawings and calculations",
    "Electrical and plumbing layouts",
    "Environmental Impact Assessment (for large projects)",
    "Tax Identification Number (TIN)",
    "Proof of payment of property rate",
    "Survey plan from licensed surveyor",
  ];

  const permitTypes = [
    {
      type: "Residential Building",
      description: "Single-family homes, duplexes, apartments",
      processingTime: "14-21 days",
    },
    {
      type: "Commercial Building",
      description: "Shops, offices, warehouses",
      processingTime: "21-30 days",
    },
    {
      type: "Industrial Building",
      description: "Factories, manufacturing plants",
      processingTime: "30-45 days",
    },
    {
      type: "Renovation/Extension",
      description: "Modifications to existing structures",
      processingTime: "7-14 days",
    },
    {
      type: "Demolition",
      description: "Complete or partial demolition",
      processingTime: "7-14 days",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Pre-Application Consultation",
      description: "Visit the Works Department to discuss your project and get guidance on requirements.",
    },
    {
      step: 2,
      title: "Prepare Documents",
      description: "Engage licensed professionals to prepare all required drawings and documents.",
    },
    {
      step: 3,
      title: "Submit Application",
      description: "Submit completed application form with all supporting documents to the Works Department.",
    },
    {
      step: 4,
      title: "Document Review",
      description: "Technical team reviews your documents for compliance with building codes and regulations.",
    },
    {
      step: 5,
      title: "Site Inspection",
      description: "Physical inspection of the site to verify information and assess suitability.",
    },
    {
      step: 6,
      title: "Development Control Board",
      description: "Application is presented to the Development Control Board for approval.",
    },
    {
      step: 7,
      title: "Payment & Collection",
      description: "Upon approval, pay the permit fee and collect your building permit.",
    },
  ];

  const fees = [
    { category: "Residential (up to 200 sqm)", amount: "GHS 500 - 1,500" },
    { category: "Residential (above 200 sqm)", amount: "GHS 1,500 - 3,000" },
    { category: "Commercial", amount: "GHS 2,000 - 10,000" },
    { category: "Industrial", amount: "GHS 5,000 - 20,000" },
    { category: "Renovation/Extension", amount: "GHS 300 - 1,000" },
    { category: "Demolition", amount: "GHS 200 - 500" },
  ];

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

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  A Building Permit is a mandatory authorization required before commencing any 
                  construction, renovation, or demolition work within the Ga South Municipality. 
                  This permit ensures that all construction activities comply with local building 
                  codes, zoning regulations, and safety standards.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The permit process helps protect property owners, neighbors, and the community 
                  by ensuring buildings are safe, structurally sound, and appropriately located. 
                  Constructing without a valid permit is illegal and may result in fines, demolition 
                  orders, or legal action.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Building Permits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {permitTypes.map((permit, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#8B0000]">
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{permit.type}</h3>
                          <p className="text-gray-600 text-sm">{permit.description}</p>
                          <p className="text-[#8B0000] text-xs mt-1 font-medium">
                            Processing: {permit.processingTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Documents</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] shrink-0 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
                <div className="space-y-6 mb-8">
                  {steps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fee Structure</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#8B0000] text-white">
                        <th className="px-4 py-3 text-left font-semibold">Building Category</th>
                        <th className="px-4 py-3 text-left font-semibold">Fee Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((fee, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-4 py-3 border-b border-gray-200">{fee.category}</td>
                          <td className="px-4 py-3 border-b border-gray-200 font-semibold text-[#8B0000]">{fee.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-800 mb-1">Warning: Building Without Permit</h4>
                      <p className="text-red-700 text-sm">
                        Construction without a valid building permit is a criminal offense. 
                        Offenders face penalties including fines, stop-work orders, and potential 
                        demolition of unauthorized structures at the owner&apos;s expense.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 mb-1">Important Notice</h4>
                      <p className="text-amber-700 text-sm">
                        Fees are subject to change. Please contact the Works Department for 
                        current fee schedules. Permit fees are calculated based on the building 
                        size, type, and location.
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
                      <p className="font-semibold text-gray-900 text-sm">Processing Time</p>
                      <p className="text-gray-600 text-sm">14-45 days (varies by type)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Where to Apply</p>
                      <p className="text-gray-600 text-sm">Works Department<br />GSMA Office, Ngleshie Amanfro</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Contact</p>
                      <p className="text-gray-600 text-sm">+233 (0)30 290 8466/7</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Permit Validity</h4>
                  <p className="text-gray-600 text-sm">
                    Building permits are valid for <strong>2 years</strong> from the date of issue. 
                    Extensions may be granted upon application before expiry.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Related Services</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/services/business-operating-permit" className="text-[#8B0000] hover:underline text-sm">
                        Business Operating Permit
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/marriage-license" className="text-[#8B0000] hover:underline text-sm">
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
