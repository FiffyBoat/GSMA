import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";

interface WelcomeSectionProps {
  overviewIntro: string[];
  vision: string;
  mission: string;
  coreValues: Array<{ title: string; description: string }>;
  mceName: string;
  mceImageUrl: string;
}

const valueIcons = [Star, Zap, ArrowRight, Heart, Users];

export default function WelcomeSection({
  overviewIntro,
  vision,
  mission,
  coreValues,
  mceName,
  mceImageUrl,
}: WelcomeSectionProps) {
  return (
    <section className="bg-white py-[44px] sm:py-[64px] md:py-[88px]">
      <div className="container mx-auto max-w-[1200px] px-[15px]">
        <div className="flex flex-col lg:flex-row gap-[30px] sm:gap-[40px] md:gap-[50px] items-start">
          <div className="flex-1">
            <h2 className="text-[#333333] text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[1.3] relative pb-[10px] mb-4 sm:mb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-[#ffcc00] border-none">
              Welcome to Ga South Municipal Assembly
            </h2>

            <div className="space-y-4 text-[#333333] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.75]">
              {overviewIntro.map((paragraph) => (
                <p key={paragraph} className="text-readable">{paragraph}</p>
              ))}
            </div>

            <Link
              href="/about/overview"
              className="inline-flex items-center gap-2 mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-3 bg-[#8B0000] text-white rounded-lg font-semibold text-[14px] sm:text-[15px] hover:bg-[#700000] transition-colors duration-300"
            >
              Read More
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-1">
                    Our Vision
                  </h3>
                  <p className="text-readable text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#666666] m-0">
                    {vision}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-1">
                    Our Mission
                  </h3>
                  <p className="text-readable text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-[#666666] m-0">
                    {mission}
                  </p>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-[#8B0000] mb-4 sm:mb-5">
                  Core Values
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {coreValues.map((value, index) => {
                    const Icon = valueIcons[index] ?? Star;
                    return (
                      <div
                        key={value.title}
                        className="flex flex-col items-center text-center gap-2 group"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#8B0000] flex items-center justify-center group-hover:bg-[#8B0000] transition-all duration-300">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B0000] group-hover:text-white" />
                        </div>
                        <p className="text-[12px] sm:text-[13px] font-semibold text-[#333333]">
                          {value.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[350px] xl:w-[400px]">
            <div className="relative border-[6px] sm:border-[8px] border-[#f8f9fa] shadow-card group">
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full overflow-hidden">
                <Image
                  src={normalizeSupabaseImageUrl(mceImageUrl)}
                  alt={`${mceName} - Municipal Chief Executive`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#8B0000]/90 p-3 sm:p-4 md:p-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[11px] sm:text-[12px] md:text-[14px] font-semibold uppercase tracking-wider mb-1 opacity-90">
                    Honorable MCE
                  </p>
                  <h4 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold leading-tight">
                    {mceName}
                  </h4>
                  <div className="w-8 sm:w-10 h-[2px] bg-[#ffcc00] mt-2 sm:mt-3"></div>
                </div>
              </div>
            </div>

            <Link
              href="/about/mce-profile"
              className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center p-3 sm:p-4 bg-[#8B0000] text-white text-[12px] sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider hover:bg-[#ffcc00] hover:text-[#333333] transition-colors duration-300 rounded-[4px]"
            >
              Read MCE&apos;s Message
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
