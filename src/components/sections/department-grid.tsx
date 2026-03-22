"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Wallet, GraduationCap, Heart, Wheat, Users, Shield, Truck, Home, Briefcase } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  slug: string;
  head_name: string;
  head_title: string;
  head_image_url?: string;
  description: string;
  contact_info?: string;
  order: number;
}

// Icon mapping based on department names
const getDepartmentIcon = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('central') || lowerName.includes('administration') || lowerName.includes('executive')) return Building2;
  if (lowerName.includes('finance') || lowerName.includes('budget') || lowerName.includes('treasury') || lowerName.includes('revenue')) return Wallet;
  if (lowerName.includes('education') || lowerName.includes('youth') || lowerName.includes('sports') || lowerName.includes('training')) return GraduationCap;
  if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('sanitation') || lowerName.includes('hygiene')) return Heart;
  if (lowerName.includes('agriculture') || lowerName.includes('farming') || lowerName.includes('works') || lowerName.includes('infrastructure')) return Wheat;
  if (lowerName.includes('social') || lowerName.includes('welfare') || lowerName.includes('community') || lowerName.includes('gender')) return Users;
  if (lowerName.includes('security') || lowerName.includes('safety') || lowerName.includes('police') || lowerName.includes('defense')) return Shield;
  if (lowerName.includes('transport') || lowerName.includes('roads') || lowerName.includes('mobility')) return Truck;
  if (lowerName.includes('housing') || lowerName.includes('development') || lowerName.includes('urban') || lowerName.includes('planning')) return Home;
  if (lowerName.includes('business') || lowerName.includes('trade') || lowerName.includes('commerce') || lowerName.includes('industry')) return Briefcase;

  return Building2; // Default icon
};

const DepartmentGrid = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchDepartments = async (isRetry = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }

      const response = await fetch('/api/content/departments?limit=8');

      if (!response.ok) {
        throw new Error(`Failed to fetch departments: ${response.status}`);
      }

      const data = await response.json();
      setDepartments(data);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching departments:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load departments';
      setError(errorMessage);

      // Auto-retry up to 2 times with exponential backoff
      if (retryCount < 2) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchDepartments(true);
        }, delay);
      }
    } finally {
      if (!isRetry) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <section
      className="py-[40px] sm:py-[60px] md:py-[80px] bg-[#f8f9fa]"
      aria-labelledby="departments-heading"
    >
      <div className="container max-w-[1200px] mx-auto px-[15px]">
        <header className="mb-[30px] sm:mb-[40px] md:mb-[50px] text-center">
          <h2
            id="departments-heading"
            className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#8B0000] relative inline-block pb-[10px] uppercase leading-[1.3] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-[#8B0000] mb-0"
          >
            Our Departments
          </h2>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-[20px] sm:p-[25px] md:p-[30px] bg-white border border-[#e0e0e0] rounded-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.05)] animate-pulse"
              >
                <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] mb-[15px] sm:mb-[18px] md:mb-[20px] bg-[#f0f0f0] rounded-full"></div>
                <div className="h-[16px] sm:h-[17px] md:h-[18px] lg:h-[19px] bg-[#f0f0f0] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-[40px]">
            <div className="text-[#666666] text-[16px] mb-[20px]">{error}</div>
            <div className="flex flex-col sm:flex-row gap-[10px] justify-center items-center">
              <button
                onClick={() => fetchDepartments()}
                className="inline-block bg-[#8B0000] text-white px-[28px] py-[12px] rounded-[4px] font-semibold text-[14px] uppercase tracking-wide hover:bg-[#ffcc00] hover:text-[#333333] transition-standard"
              >
                Try Again
              </button>
              {retryCount > 0 && (
                <span className="text-[#999] text-[12px]">
                  Retry attempt {retryCount}/2
                </span>
              )}
            </div>
          </div>
        ) : departments.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px]"
              role="grid"
              aria-label="Departments grid"
            >
              {departments.map((dept, index) => {
                const IconComponent = getDepartmentIcon(dept.name);
                return (
                  <div
                    key={dept.id}
                    className="animate-fade-in-up opacity-0"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                    role="gridcell"
                  >
                    <Link
                      href={`/departments/${dept.slug}`}
                      className="group flex flex-col items-center justify-center p-[20px] sm:p-[25px] md:p-[30px] bg-white border border-[#e0e0e0] rounded-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[#ffcc00] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 h-full"
                      aria-label={`Learn more about ${dept.name} department`}
                    >
                      <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] mb-[15px] sm:mb-[18px] md:mb-[20px] bg-[#f8f9fa] rounded-full flex items-center justify-center group-hover:bg-[#ffcc00]/10 transition-colors duration-300">
                        <IconComponent
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#8B0000] transition-transform duration-300 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold text-[#333333] text-center mb-0 group-hover:text-[#8B0000] transition-colors duration-300 uppercase tracking-wide leading-tight">
                        {dept.name}
                      </h3>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="mt-[40px] sm:mt-[45px] md:mt-[50px] text-center">
              <Link
                href="/departments"
                className="inline-block bg-[#8B0000] text-white px-[28px] sm:px-[32px] md:px-[35px] py-[12px] sm:py-[13px] md:py-[14px] rounded-[4px] font-semibold text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wide hover:bg-[#ffcc00] hover:text-[#333333] transition-standard"
              >
                View All Departments
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-[40px]">
            <div className="text-[#666666] text-[16px] mb-[20px]">No departments available at the moment.</div>
            <Link
              href="/contact"
              className="inline-block bg-[#8B0000] text-white px-[28px] py-[12px] rounded-[4px] font-semibold text-[14px] uppercase tracking-wide hover:bg-[#ffcc00] hover:text-[#333333] transition-standard"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentGrid;
