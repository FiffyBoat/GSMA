"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Phone, Mail, Instagram, Twitter, ChevronDown, Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

interface Department {
  id: string;
  name: string;
  slug: string;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Fetch departments from the database
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/content/departments");
        if (res.ok) {
          const data = await res.json();
          setDepartments(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const getNavLinks = (): NavLink[] => [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about/overview",
      dropdown: [
        { name: "Overview", href: "/about/overview" },
        { name: "The Assembly", href: "/about/assembly" },
        { name: "Leadership", href: "/about/leadership" },
        { name: "MCE Profile", href: "/about/mce-profile" },
        { name: "MCD Profile", href: "/about/mcd-profile" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Business Operating Permit", href: "/services/business-operating-permit" },
        { name: "Marriage License", href: "/services/marriage-license" },
        { name: "Building Permit", href: "/services/building-permit" },
        { name: "Property Rates", href: "/services/property-rates" },
        { name: "Signage Permit", href: "/services/signage-permit" },
      ],
    },
    {
      name: "Departments",
      href: "/departments",
      dropdown: [
        { name: "All Departments", href: "/departments" },
        ...departments.map((dept) => ({
          name: dept.name,
          href: `/departments/${dept.slug}`,
        })),
        { name: "Units & Committees", href: "/units-committees" },
      ],
    },
    { name: "Projects", href: "/projects" },
    {
      name: "Media",
      href: "/news",
      dropdown: [
        { name: "News", href: "/news" },
        { name: "Events", href: "/events" },
        { name: "Gallery", href: "/gallery" },
        { name: "Documents", href: "/documents" },
      ],
    },
    { name: "Portals", href: "/portals" },
    { name: "Contact Us", href: "/contact" },
  ];

  const navLinks = getNavLinks();

  const toggleMobileDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-[1000] w-full font-sans">
      <div className="bg-[#8B0000] text-white py-[5px] hidden md:block border-b border-[#6B0000]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-[12px] sm:text-[13px] font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <a href="tel:+233302908466" className="flex items-center hover:text-[#ffcc00] transition-colors">
              <Phone className="w-3.5 h-3.5 mr-2 fill-white/10" />
              <span className="truncate">+233 (0)30 290 8466/7</span>
            </a>
            <a href="mailto:info@gsma.gov.gh" className="hidden sm:flex items-center hover:text-[#ffcc00] transition-colors">
              <Mail className="w-3.5 h-3.5 mr-2" />
              <span className="truncate">info@gsma.gov.gh</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://web.facebook.com/gasouthmunicipal" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors" aria-label="Facebook" title="Visit Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.53L14.17.53A5.44,5.44,0,0,0,8.44,6v1.46H5v4.59H8.44V23.47h6.06V12.05h4.1l.17-4.59Z" />
              </svg>
            </a>
            <a href="https://x.com/GaSouthAssembly" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors" aria-label="Twitter" title="Visit Twitter/X">
              <Twitter className="w-4 h-4 fill-current" />
            </a>
            <a href="https://www.instagram.com/gasouthmunicipalassembly/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors" aria-label="Instagram" title="Visit Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <nav className="relative w-full border-b border-gray-100/80 bg-white/95 py-2 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 py-2">
              <Image
                src="/logo.png"
                alt="Ga South Municipal Assembly Logo"
                width={50}
                height={50}
                className="object-contain sm:w-[60px] sm:h-[60px]"
              />
              <div className="flex flex-col">
                <span className="text-[#8B0000] font-bold text-xs sm:text-sm leading-tight tracking-[0.2em]">GA SOUTH</span>
                <span className="text-[#1a1a1a] text-[10px] sm:text-xs leading-tight">Municipal Assembly</span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            <ul className="flex items-center list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group px-1">
                  <Link
                    href={link.href}
                    className="flex items-center rounded-full px-2.5 py-2 text-[12px] xl:text-[13px] font-bold text-[#333333] uppercase tracking-wide hover:bg-[#fff5f0] hover:text-[#8B0000] transition-colors group-hover:text-[#8B0000]"
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {link.dropdown && (
                    <div className="absolute top-full left-0 z-50 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                      <ul className="py-2">
                        {link.dropdown.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className="block rounded-xl px-4 py-2.5 text-[12px] font-medium text-gray-700 hover:bg-[#fff8f5] hover:text-[#8B0000] transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <Link
              href="/search"
              className="ml-2 xl:ml-4 rounded-full border border-transparent p-2 text-[#333333] hover:border-[#8B0000]/15 hover:bg-[#fff5f0] hover:text-[#8B0000] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-3">
            <Link
              href="/search"
              className="p-2 text-[#333333] hover:text-[#8B0000] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button 
              className="p-2 text-[#333333] hover:text-[#8B0000] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-white z-[1100] transform transition-transform duration-300 lg:hidden ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-3 sm:p-4 flex justify-between items-center border-b">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Ga South Municipal Assembly Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="text-[#8B0000] font-bold text-xs leading-tight">GA SOUTH</span>
                <span className="text-[#1a1a1a] text-[10px] leading-tight">Municipal Assembly</span>
              </div>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-60px)] pb-20">
            <ul className="py-1">
              {navLinks.map((link) => (
                <li key={link.name} className="border-b border-gray-100 last:border-0">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown(link.name)}
                        className="w-full flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 text-[13px] sm:text-[14px] font-bold text-[#333333] uppercase hover:bg-gray-50 transition-colors"
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === link.name && (
                        <ul className="bg-gray-50 py-1">
                          {link.dropdown.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-6 sm:px-8 py-2.5 sm:py-3 text-[12px] sm:text-[13px] font-medium text-gray-600 hover:text-[#8B0000] hover:bg-white transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 sm:px-6 py-3 sm:py-4 text-[13px] sm:text-[14px] font-bold text-[#333333] uppercase hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="px-4 sm:px-6 py-6 sm:py-8 bg-gray-50 border-t flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase text-gray-700">Contact</h3>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                <a href="tel:+233302908466" className="text-gray-600 hover:text-[#8B0000]">
                  +233 (0)30 290 8466
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#8B0000] flex-shrink-0" />
                <a href="mailto:info@gsma.gov.gh" className="text-gray-600 hover:text-[#8B0000]">
                  info@gsma.gov.gh
                </a>
              </div>
              <div className="flex gap-3 pt-2">
                <a href="https://web.facebook.com/gasouthmunicipal" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded hover:bg-gray-100 transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-[#8B0000]" viewBox="0 0 24 24">
                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.53L14.17.53A5.44,5.44,0,0,0,8.44,6v1.46H5v4.59H8.44V23.47h6.06V12.05h4.1l.17-4.59Z" />
                  </svg>
                </a>
                <a href="https://x.com/GaSouthAssembly" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded hover:bg-gray-100 transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4 text-[#8B0000]" />
                </a>
                <a href="https://www.instagram.com/gasouthmunicipalassembly/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded hover:bg-gray-100 transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-[#8B0000]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
