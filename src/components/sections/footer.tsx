"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] pt-[22px] font-sans text-white sm:pt-[28px] md:pt-[34px]">
      <div className="container mx-auto max-w-[1200px] px-[15px]">
        <div className="grid grid-cols-1 gap-[22px] pb-[24px] sm:grid-cols-2 sm:gap-[26px] md:gap-[32px] lg:grid-cols-4">
          <div className="flex flex-col">
            <div className="mb-[18px] flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ga South Municipal Assembly Logo"
                width={52}
                height={52}
                className="object-contain sm:h-[56px] sm:w-[56px]"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight tracking-[0.22em] text-white sm:text-sm">
                  GA SOUTH
                </span>
                <span className="text-[10px] leading-tight text-white/80 sm:text-xs">
                  Municipal Assembly
                </span>
              </div>
            </div>
            <p className="text-readable mb-[15px] text-[13px] leading-[1.85] text-white/90 sm:mb-[20px] sm:text-[14px] md:text-[15px]">
              The Ga South Municipal Assembly (GSMA) is an administrative district
              in the Greater Accra Region of Ghana. Our mission is to provide
              quality services and development projects to improve the lives of our
              citizens.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="relative mb-[15px] pb-[8px] text-[14px] font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[40px] after:bg-[#8B0000] sm:mb-[20px] sm:text-[16px] md:mb-[25px] md:pb-[10px] md:text-[18px]">
              QUICK LINKS
            </h3>
            <ul className="space-y-[10px] sm:space-y-[12px]">
              {[
                { name: "Home", href: "/" },
                { name: "About GSMA", href: "/about/overview" },
                { name: "Departments", href: "/departments" },
                { name: "News & Updates", href: "/news" },
                { name: "Portals", href: "/portals" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-[13px] text-white/90 transition-colors duration-300 hover:text-[#ffcc00] sm:text-[14px] md:text-[15px]"
                  >
                    <ChevronRight className="mr-2 -ml-5 h-3 w-3 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="relative mb-[15px] pb-[8px] text-[14px] font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[40px] after:bg-[#8B0000] sm:mb-[20px] sm:text-[16px] md:mb-[25px] md:pb-[10px] md:text-[18px]">
              CONTACT INFO
            </h3>
            <div className="space-y-[12px] sm:space-y-[14px] md:space-y-[18px]">
              <div className="flex items-start text-[12px] text-white/90 sm:text-[13px] md:text-[15px]">
                <MapPin className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffcc00] sm:mr-3 sm:mt-1 sm:h-5 sm:w-5" />
                <div>
                  <span className="block">P. O. Box WJ 305, Ngleshie Amanfro</span>
                  <span className="block text-[11px] text-white/70 sm:text-[12px]">
                    Behind Galilea Market
                  </span>
                  <span className="block text-[11px] text-white/70 sm:text-[12px]">
                    Digital Address: GS0623-8123
                  </span>
                </div>
              </div>
              <div className="flex items-center text-[12px] text-white/90 sm:text-[13px] md:text-[15px]">
                <Phone className="mr-2 h-4 w-4 flex-shrink-0 text-[#ffcc00] sm:mr-3 sm:h-5 sm:w-5" />
                <a
                  href="tel:+233302908466"
                  className="transition-colors hover:text-[#ffcc00]"
                >
                  +233 (0)30 290 8466/7
                </a>
              </div>
              <div className="flex items-center break-all text-[12px] text-white/90 sm:text-[13px] md:text-[15px]">
                <Mail className="mr-2 h-4 w-4 flex-shrink-0 text-[#ffcc00] sm:mr-3 sm:h-5 sm:w-5" />
                <a
                  href="mailto:info@gsma.gov.gh"
                  className="transition-colors hover:text-[#ffcc00]"
                >
                  info@gsma.gov.gh
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="relative mb-[15px] pb-[8px] text-[14px] font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[40px] after:bg-[#8B0000] sm:mb-[20px] sm:text-[16px] md:mb-[25px] md:pb-[10px] md:text-[18px]">
              FOLLOW US
            </h3>
            <p className="text-readable mb-[12px] text-[12px] text-white/90 sm:mb-[15px] sm:text-[13px] md:mb-[20px] md:text-[15px]">
              Stay updated with our latest activities, notices, and community
              highlights on social media.
            </p>
            <div className="flex gap-[10px] sm:gap-[12px]">
              <a
                href="https://web.facebook.com/gasouthmunicipal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#8B0000] transition-colors hover:bg-[#6B0000] sm:h-[44px] sm:w-[44px]"
                title="Visit Facebook"
              >
                <Facebook className="h-[18px] w-[18px] text-white sm:h-[20px] sm:w-[20px]" />
              </a>
              <a
                href="https://x.com/GaSouthAssembly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#8B0000] transition-colors hover:bg-[#6B0000] sm:h-[44px] sm:w-[44px]"
                title="Visit Twitter/X"
              >
                <Twitter className="h-[18px] w-[18px] text-white sm:h-[20px] sm:w-[20px]" />
              </a>
              <a
                href="https://www.instagram.com/gasouthmunicipalassembly/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#8B0000] transition-colors hover:bg-[#6B0000] sm:h-[44px] sm:w-[44px]"
                title="Visit Instagram"
              >
                <Instagram className="h-[18px] w-[18px] text-white sm:h-[20px] sm:w-[20px]" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCJcI5FHNEmZQjNvZ3_hkRpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#8B0000] transition-colors hover:bg-[#6B0000] sm:h-[44px] sm:w-[44px]"
                title="Visit YouTube"
              >
                <Youtube className="h-[18px] w-[18px] text-white sm:h-[20px] sm:w-[20px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#8B0000] py-[22px]">
        <div className="container mx-auto max-w-[1200px] px-[15px]">
          <div className="flex flex-col items-center justify-between text-[13px] md:flex-row md:text-[14px]">
            <div className="mb-[10px] flex-1 text-center text-white/90 md:mb-0">
              © {currentYear} Ga South Municipal Assembly. All rights reserved.
            </div>
            <div className="text-white/90">
              Designed by <span className="font-semibold text-[#ffcc00]">MIS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
