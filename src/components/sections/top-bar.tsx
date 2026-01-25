"use client";

import React from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

/**
 * TopBar Component
 * 
 * A pixel-perfect clone of the top header bar featuring contact info and social icons.
 * Styles derived from the high-level design and specific instructions:
 * - Dark background (using the primary green or a deep dark neutral)
 * - White text
 * - Responsive layout with container constraints
 */

const TopBar = () => {
  return (
    <div className="bg-[#333333] text-white text-[11px] sm:text-[12px] md:text-[13px] py-[8px] sm:py-[9px] md:py-[10px] hidden md:block">
      <div className="container mx-auto max-w-[1200px] px-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[10px] sm:gap-[15px] md:gap-[20px]">
        
        {/* Contact Info (Left Side) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[8px] sm:gap-[12px] md:gap-[16px] lg:gap-[24px]">
          <div className="flex items-center gap-[6px] sm:gap-[8px]">
            <Phone size={14} className="text-[#ffcc00] flex-shrink-0" />
            <a 
              href="tel:+233302908253" 
              className="hover:text-[#ffcc00] transition-standard font-medium whitespace-nowrap"
            >
              +233 (0) 302 908 253
            </a>
          </div>
          <div className="flex items-center gap-[6px] sm:gap-[8px]">
            <Mail size={14} className="text-[#ffcc00] flex-shrink-0" />
            <a 
              href="mailto:info@gsma.gov.gh" 
              className="hover:text-[#ffcc00] transition-standard font-medium truncate"
            >
              info@gsma.gov.gh
            </a>
          </div>
        </div>

        {/* Social Media Icons (Right Side) */}
        <div className="flex items-center gap-[12px] sm:gap-[14px] md:gap-[16px]">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffcc00] transition-standard"
            aria-label="Facebook"
          >
            <Facebook size={15} className="md:w-[16px] md:h-[16px]" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffcc00] transition-standard"
            aria-label="Twitter"
          >
            <Twitter size={15} className="md:w-[16px] md:h-[16px]" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffcc00] transition-standard"
            aria-label="Instagram"
          >
            <Instagram size={15} className="md:w-[16px] md:h-[16px]" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#ffcc00] transition-standard"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} className="md:w-[16px] md:h-[16px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;