"use client";

import React from 'react';
import Image from 'next/image';
import { Eye, Target, Compass, BookOpen } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <section className="py-[40px] sm:py-[60px] md:py-[80px] bg-white">
      <div className="container mx-auto max-w-[1200px] px-[15px]">
        <div className="flex flex-col lg:flex-row gap-[30px] sm:gap-[40px] md:gap-[50px] items-start">
          
          {/* Left Content Column */}
          <div className="flex-1">
            <h2 className="text-[#333333] text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[1.3] relative pb-[10px] mb-4 sm:mb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[#ffcc00] border-none">
              Welcome to Ga South Municipal Assembly
            </h2>
            
            <div className="text-[#333333] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] space-y-4 sm:space-y-5">
              <p>
                The Ga South Municipal Assembly was established by Legislative Instrument (L.I) 2134 in 2012. 
                It was carved out of the then Ga West District Assembly with Ngleshie Amanfro as its capital. 
                The Assembly is responsible for the overall development of the municipality and operates 
                under the Ministry of Local Government, Decentralization and Rural Development.
              </p>
              <p>
                Our administration is committed to providing essential social services and fostering an 
                enabling environment for sustainable development through participatory governance. 
                We prioritize infrastructure development, sanitation, health, and education to improve 
                the quality of life for all residents within our jurisdiction.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10">
              {/* Mission */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-1">Our Mission</h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#666666] m-0">
                    To facilitate the improvement of quality of life within the Municipality.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-1">Our Vision</h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#666666] m-0">
                    A first-class Municipality providing excellent service to its people.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-1">Core Values</h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#666666] m-0">
                    Integrity, Professionalism, Accountability, and Transparency.
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-1">Public Service</h3>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#666666] m-0">
                    Dedicated to serving the needs of our community with excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image/Profile Column */}
          <div className="w-full lg:w-[350px] xl:w-[400px]">
            <div className="relative border-[6px] sm:border-[8px] border-[#f8f9fa] shadow-card group">
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full overflow-hidden">
                  <Image
                    src="/mce-portrait.jpg"
                    alt="Hon. Moses Kabu Kubi Ocansey - Municipal Chief Executive"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#8B0000]/90 p-3 sm:p-4 md:p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[11px] sm:text-[12px] md:text-[14px] font-semibold uppercase tracking-wider mb-1 opacity-90">Honorable MCE</p>
                    <h4 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold leading-tight">Moses Kabu Kubi Ocansey</h4>
                    <div className="w-8 sm:w-10 h-[2px] bg-[#ffcc00] mt-2 sm:mt-3"></div>
                  </div>
                </div>
            </div>
            
            <a 
              href="/about/mce-profile" 
              className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center p-3 sm:p-4 bg-[#8B0000] text-white text-[12px] sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider hover:bg-[#ffcc00] hover:text-[#333333] transition-colors duration-300 rounded-[4px]"
            >
              Read MCE's Message
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;