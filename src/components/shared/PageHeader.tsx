"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  backgroundImage?: string;
}

export default function PageHeader({ title, breadcrumbs, backgroundImage }: PageHeaderProps) {
  return (
    <div 
      className="relative bg-[#8B0000] py-[40px] sm:py-[50px] md:py-[60px] lg:py-[80px]"
      style={{
        backgroundImage: backgroundImage ? `linear-gradient(rgba(0, 104, 56, 0.9), rgba(0, 104, 56, 0.95)), url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-[15px]">
        <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-bold text-white mb-[16px] sm:mb-[18px] md:mb-[20px] leading-[1.2]">{title}</h1>
        <nav className="flex items-center flex-wrap gap-[6px] sm:gap-[8px] text-[11px] sm:text-[12px] md:text-[13px] md:text-[14px]">
          <Link href="/" className="text-white/80 hover:text-[#ffcc00] transition-colors flex items-center gap-[4px] sm:gap-[6px]">
            <Home className="w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px]" />
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-[4px] sm:gap-[6px]">
              <ChevronRight className="w-[14px] sm:w-[15px] md:w-[16px] h-[14px] sm:h-[15px] md:h-[16px] text-white/60" />
              {crumb.href ? (
                <Link href={crumb.href} className="text-white/80 hover:text-[#ffcc00] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#ffcc00] font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
