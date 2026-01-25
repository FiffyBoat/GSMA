"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white pt-[40px] sm:pt-[50px] md:pt-[60px] font-sans">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[25px] md:gap-[30px] pb-[30px] md:pb-[40px]">
          
          <div className="flex flex-col">
            <div className="mb-[15px] sm:mb-[20px] md:mb-[25px] flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Ga South Municipal Assembly Logo"
                width={50}
                height={50}
                className="object-contain sm:w-[55px] sm:h-[55px]"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-xs sm:text-sm leading-tight">GA SOUTH</span>
                <span className="text-white/80 text-[10px] sm:text-xs leading-tight">Municipal Assembly</span>
              </div>
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] text-white/90 mb-[15px] sm:mb-[20px]">
              The Ga South Municipal Assembly (GSMA) is an administrative district in the Greater Accra Region of Ghana. Our mission is to provide quality services and development projects to improve the lives of our citizens.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[15px] sm:mb-[20px] md:mb-[25px] relative pb-[8px] md:pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[40px] after:h-[2px] after:bg-[#8B0000]">
              QUICK LINKS
            </h3>
            <ul className="space-y-[10px] sm:space-y-[12px]">
              {[
                { name: 'Home', href: '/' },
                { name: 'About GSMA', href: '/about/overview' },
                { name: 'Departments', href: '/departments/central-administration' },
                { name: 'News & Updates', href: '/news' },
                { name: 'Portals', href: '/portals' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[13px] sm:text-[14px] md:text-[15px] text-white/90 hover:text-[#8B0000] transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[15px] sm:mb-[20px] md:mb-[25px] relative pb-[8px] md:pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[40px] after:h-[2px] after:bg-[#8B0000]">
              CONTACT INFO
            </h3>
            <div className="space-y-[12px] sm:space-y-[14px] md:space-y-[18px]">
              <div className="flex items-start text-[12px] sm:text-[13px] md:text-[15px] text-white/90">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 sm:mt-1 text-[#8B0000] flex-shrink-0" />
                <div>
                  <span className="block">P. O. Box WJ 305, Ngleshie Amanfro</span>
                  <span className="block text-white/70 text-[11px] sm:text-[12px]">Behind Galilea Market</span>
                  <span className="block text-white/70 text-[11px] sm:text-[12px]">Digital Address: GS0623-8123</span>
                </div>
              </div>
              <div className="flex items-center text-[12px] sm:text-[13px] md:text-[15px] text-white/90">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#8B0000] flex-shrink-0" />
                <a href="tel:+233302908466" className="hover:text-[#8B0000] transition-colors">
                  +233 (0)30 290 8466/7
                </a>
              </div>
              <div className="flex items-center text-[12px] sm:text-[13px] md:text-[15px] text-white/90 break-all">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#8B0000] flex-shrink-0" />
                <a href="mailto:info@gsma.gov.gh" className="hover:text-[#8B0000] transition-colors">
                  info@gsma.gov.gh
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold mb-[15px] sm:mb-[20px] md:mb-[25px] relative pb-[8px] md:pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[40px] after:h-[2px] after:bg-[#8B0000]">
              FOLLOW US
            </h3>
            <p className="text-[12px] sm:text-[13px] md:text-[15px] text-white/90 mb-[12px] sm:mb-[15px] md:mb-[20px]">
              Stay updated with our latest activities on social media.
            </p>
            <div className="flex gap-[8px] sm:gap-[10px]">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#8B0000] hover:border-[#8B0000] transition-all duration-300 group rounded-[2px]"
                >
                  <span className="capitalize text-[12px] font-bold">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#8B0000] py-[25px]">
        <div className="container mx-auto px-[15px] max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-center text-[14px]">
            <div className="text-white/90 mb-[10px] md:mb-0">
              © {currentYear} Ga South Municipal Assembly. All rights reserved.
            </div>
            <div className="text-white/90 text-center">
              Designed by <span className="text-[#ffcc00] font-semibold">MIS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
