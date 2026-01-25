"use client";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { FileText, Clock, CheckCircle, AlertCircle, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function BusinessOperatingPermitPage() {
  const requirements = [
    "Completed application form",
    "Valid National ID (Ghana Card)",
    "Passport-sized photographs (2)",
    "Business registration certificate from Registrar General's Department",
    "Tax Identification Number (TIN)",
    "Proof of business location (tenancy agreement or property documents)",
    "Environmental and Health Permit (for applicable businesses)",
    "Fire Safety Certificate (for applicable businesses)",
    "Site plan of business premises",
  ];

  const steps = [
    {
      step: 1,
      title: "Obtain Application Form",
      description: "Visit the Ga South Municipal Assembly office or download the application form online.",
    },
    {
      step: 2,
      title: "Complete the Form",
      description: "Fill out all required sections accurately and attach necessary documents.",
    },
    {
      step: 3,
      title: "Submit Application",
      description: "Submit your completed application with all supporting documents to the Revenue Unit.",
    },
    {
      step: 4,
      title: "Inspection",
      description: "An inspection team will visit your business premises to verify the information provided.",
    },
    {
      step: 5,
      title: "Payment",
      description: "Upon approval, pay the required fees at the Finance Department.",
    },
    {
      step: 6,
      title: "Collect Permit",
      description: "Collect your Business Operating Permit from the Revenue Unit.",
    },
  ];

  const fees = [
    { category: "Small Scale Business", amount: "GHS 100 - 300" },
    { category: "Medium Scale Business", amount: "GHS 300 - 800" },
    { category: "Large Scale Business", amount: "GHS 800 - 2,000" },
    { category: "Industrial/Manufacturing", amount: "GHS 2,000+" },
  ];

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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  A Business Operating Permit is a mandatory document required for all businesses 
                  operating within the Ga South Municipality. This permit ensures that your business 
                  complies with local regulations and standards, and contributes to the development 
                  of the municipality through the payment of applicable fees.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The permit is valid for one calendar year (January to December) and must be renewed 
                  annually. Operating a business without a valid permit is an offense and may result 
                  in penalties or closure of the business.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
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
                        <th className="px-4 py-3 text-left font-semibold">Business Category</th>
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

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 mb-1">Important Notice</h4>
                      <p className="text-amber-700 text-sm">
                        Fees may vary based on the nature, size, and location of your business. 
                        Please visit our office for an accurate assessment of your permit fees.
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
                      <p className="text-gray-600 text-sm">5-10 working days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Where to Apply</p>
                      <p className="text-gray-600 text-sm">Revenue Unit, GSMA Office<br />Ngleshie Amanfro</p>
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

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Related Services</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/services/building-permit" className="text-[#8B0000] hover:underline text-sm">
                        Building Permit
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
