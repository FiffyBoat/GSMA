"use client";

import React from 'react';
import Image from 'next/image';
import { Building2, Wallet, GraduationCap, Heart, Wheat } from 'lucide-react';

const departments = [
  {
    title: "Central Administration",
    icon: Building2,
    link: "#",
  },
  {
    title: "Finance",
    icon: Wallet,
    link: "#",
  },
  {
    title: "Education",
    icon: GraduationCap,
    link: "#",
  },
  {
    title: "Health",
    icon: Heart,
    link: "#",
  },
  {
    title: "Agriculture",
    icon: Wheat,
    link: "#",
  },
];

const DepartmentGrid = () => {
  return (
    <section className="py-[40px] sm:py-[60px] md:py-[80px] bg-[#f8f9fa]">
      <div className="container max-w-[1200px] mx-auto px-[15px]">
        <div className="mb-[30px] sm:mb-[40px] md:mb-[50px] text-center">
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#8B0000] relative inline-block pb-[10px] uppercase leading-[1.3] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-[#8B0000] mb-0">
            Our Departments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
          {departments.map((dept, index) => (
            <a
              key={index}
              href={dept.link}
              className="group flex flex-col items-center justify-center p-[20px] sm:p-[25px] md:p-[30px] bg-white border border-[#e0e0e0] rounded-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#ffcc00] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] mb-[15px] sm:mb-[18px] md:mb-[20px] bg-[#f8f9fa] rounded-full flex items-center justify-center group-hover:bg-[#ffcc00]/10 transition-colors duration-300">
                <dept.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#8B0000] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold text-[#333333] text-center mb-0 group-hover:text-[#8B0000] transition-colors duration-300 uppercase tracking-wide leading-tight">
                {dept.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentGrid;