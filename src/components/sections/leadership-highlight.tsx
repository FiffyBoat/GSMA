"use client";

import React from 'react';
import Image from 'next/image';

const LeadershipHighlight = () => {
  return (
    <section className="py-[40px] sm:py-[60px] md:py-[80px] bg-white">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-start gap-[25px] sm:gap-[28px] md:gap-[30px]">
          {/* Left Side: Portrait Image */}
          <div className="w-full lg:w-5/12">
              <div className="relative overflow-hidden shadow-card border border-[#E0E0E0] rounded-lg">
                <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                  <Image
                    src="/mce-portrait.jpg"
                    alt="Hon. Moses Kabu Kubi Ocansey - Municipal Chief Executive"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-ghana-green px-[15px] sm:px-[18px] md:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] md:py-[16px]">
                  <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold mb-0 leading-tight">
                    Hon. Moses Kabu Kubi Ocansey
                  </h3>
                  <p className="text-ghana-gold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold uppercase tracking-wider mb-0">
                    Municipal Chief Executive
                  </p>
                </div>
              </div>
          </div>

          {/* Right Side: Message & Bio */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <h2 className="text-[#8B0000] text-[24px] sm:text-[28px] md:text-[32px] font-bold pb-[10px] mb-[20px] sm:mb-[24px] md:mb-[30px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:height-[3px] after:bg-ghana-green">
              Message from the MCE
            </h2>
            
            <div className="relative pt-[12px] sm:pt-[14px] md:pt-[16px]">
              {/* Stylized Quote Mark */}
              <div className="absolute -top-4 -left-2 text-[60px] sm:text-[70px] md:text-[80px] text-ghana-green/10 font-serif leading-none pointer-events-none">
                &ldquo;
              </div>
              
              <p className="text-[#333333] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] font-medium italic mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[24px]">
                &quot;Our commitment to the people of Ga South remains unwavering. We are focused on sustainable development, transparent governance, and providing the infrastructure needed for a modern, thriving municipality.&quot;
              </p>
              
              <div className="space-y-[12px] sm:space-y-[14px] md:space-y-[16px] text-[#666666] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5] sm:leading-[1.6] md:leading-[1.6]">
                <p>
                  As the administrative head of the Ga South Municipal Assembly (GSMA), I am honored to lead a dedicated team of professionals working tirelessly to improve the quality of life for all residents within our jurisdiction. 
                </p>
                <p>
                  Since our inception, GSMA has been at the forefront of local governance in the Greater Accra Region. We believe that development must be inclusive and community-driven. Our website serves as a digital gateway to our services, keeping you informed about our projects, initiatives, and the various ways you can engage with local government.
                </p>
                <p>
                  We invite you to explore our various departments, stay updated with the latest news, and join us in our mission to build a resilient and prosperous Ga South.
                </p>
              </div>

              <div className="mt-[20px] sm:mt-[24px] md:mt-[28px] lg:mt-[32px]">
                <a 
                  href="/about/mce-profile" 
                  className="inline-block bg-ghana-green text-white px-[24px] sm:px-[28px] md:px-[32px] lg:px-[40px] py-[10px] sm:py-[12px] md:py-[13px] lg:py-[14px] rounded-md font-semibold text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wide hover:bg-ghana-gold hover:text-[#333333] transition-standard shadow-sm"
                >
                  Read Full Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipHighlight;