"use client";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { FileText, Clock, CheckCircle, AlertCircle, Phone, MapPin, Heart } from "lucide-react";
import Link from "next/link";

export default function MarriageLicensePage() {
  const requirements = [
    "Completed marriage license application form",
    "Valid National ID (Ghana Card) for both parties",
    "Birth certificates of both parties",
    "Passport-sized photographs (4 each)",
    "Proof of residence in Ga South Municipality",
    "Death certificate of former spouse (if widowed)",
    "Divorce certificate (if previously divorced)",
    "Parental consent (if under 21 years)",
    "Two witnesses with valid IDs",
  ];

  const steps = [
    {
      step: 1,
      title: "Notice of Marriage",
      description: "Both parties must appear at the GSMA office to give notice of their intention to marry.",
    },
    {
      step: 2,
      title: "Submit Documents",
      description: "Submit all required documents along with the completed application form.",
    },
    {
      step: 3,
      title: "Publication Period",
      description: "A 21-day publication period follows to allow for any objections to the marriage.",
    },
    {
      step: 4,
      title: "Pay License Fee",
      description: "After the publication period, pay the marriage license fee at the Finance Department.",
    },
    {
      step: 5,
      title: "Collect License",
      description: "Collect your marriage license from the Births and Deaths Registry Unit.",
    },
    {
      step: 6,
      title: "Marriage Ceremony",
      description: "The marriage can be solemnized within 3 months of the license issuance.",
    },
  ];

  const fees = [
    { service: "Marriage License Fee", amount: "GHS 200" },
    { service: "Publication Fee", amount: "GHS 50" },
    { service: "Certificate Fee", amount: "GHS 100" },
    { service: "Ceremony at Assembly Hall", amount: "GHS 500" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Marriage License"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Marriage License" },
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The Ga South Municipal Assembly is authorized to issue marriage licenses under the 
                  Marriage Ordinance (CAP 127). A marriage license is required for couples who wish 
                  to have their union legally recognized under Ghanaian law.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The Assembly also provides facilities for civil marriage ceremonies at the Assembly 
                  Hall for couples who prefer to have their wedding conducted at the municipality. 
                  Marriages conducted under the ordinance provide legal protection and rights to both parties.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Requirements</h2>
                <div className="bg-[#8B0000]/5 rounded-lg p-6 mb-8">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#8B0000]" />
                      <span className="text-gray-700">Both parties must be at least 18 years old</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#8B0000]" />
                      <span className="text-gray-700">Not currently married to another person</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#8B0000]" />
                      <span className="text-gray-700">Not within prohibited degrees of relationship</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#8B0000]" />
                      <span className="text-gray-700">Mental capacity to consent</span>
                    </li>
                  </ul>
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
                        <th className="px-4 py-3 text-left font-semibold">Service</th>
                        <th className="px-4 py-3 text-left font-semibold">Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((fee, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-4 py-3 border-b border-gray-200">{fee.service}</td>
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
                        Both parties must be present for the initial application. Foreign nationals 
                        may require additional documentation including a valid visa and letter from 
                        their embassy.
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
                      <p className="text-gray-600 text-sm">21 days (publication period)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#8B0000] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Where to Apply</p>
                      <p className="text-gray-600 text-sm">Births & Deaths Registry<br />GSMA Office, Ngleshie Amanfro</p>
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
                      <Link href="/services/business-operating-permit" className="text-[#8B0000] hover:underline text-sm">
                        Business Operating Permit
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/building-permit" className="text-[#8B0000] hover:underline text-sm">
                        Building Permit
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
