"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Heart, Building2, ArrowRight } from "lucide-react";

const services = [
  {
    id: "business-operating-permit",
    title: "Business Operating Permit",
    description: "Register your business and obtain the necessary permits to operate legally within the Ga South Municipality.",
    icon: Briefcase,
    href: "/services/business-operating-permit",
  },
  {
    id: "marriage-license",
    title: "Marriage License",
    description: "Apply for an official marriage license to legally solemnize your union at the Ga South Municipal Assembly.",
    icon: Heart,
    href: "/services/marriage-license",
  },
  {
    id: "building-permit",
    title: "Building Permit",
    description: "Obtain approval for construction, renovation, or demolition projects within the municipality.",
    icon: Building2,
    href: "/services/building-permit",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-[40px] sm:py-[60px] md:py-[80px] bg-gray-50">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 mb-3 sm:mb-4">Our Services</h2>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-600 max-w-2xl mx-auto px-4">
            The Ga South Municipal Assembly provides essential services to residents and businesses. 
            Explore our key services below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold text-gray-900 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-[#8B0000] font-semibold text-[12px] sm:text-[13px] md:text-[14px] hover:gap-3 gap-2 transition-all duration-300"
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

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#8B0000] text-white font-bold text-[12px] sm:text-[13px] md:text-[14px] rounded hover:bg-[#6B0000] transition-colors"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
