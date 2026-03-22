import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";

interface LeadershipHighlightProps {
  mceName: string;
  mceTitle: string;
  mceImageUrl: string;
  mceQuote: string;
  mceIntro: string[];
}

export default function LeadershipHighlight({
  mceName,
  mceTitle,
  mceImageUrl,
  mceQuote,
  mceIntro,
}: LeadershipHighlightProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#fffdf8,#f7f2e8)] py-[44px] sm:py-[64px] md:py-[88px]">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <div className="overflow-hidden rounded-[30px] border border-[#eadfce] bg-white/85 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:p-7 md:p-8">
        <div className="flex flex-col lg:flex-row items-start gap-[25px] sm:gap-[28px] md:gap-[36px]">
          <div className="w-full lg:w-5/12">
            <div className="relative overflow-hidden rounded-[24px] border border-[#efe4d2] bg-white shadow-card">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                <Image
                  src={normalizeSupabaseImageUrl(mceImageUrl)}
                  alt={`${mceName} - Municipal Chief Executive`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#8B0000]/92 px-[15px] sm:px-[18px] md:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] md:py-[16px]">
                <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold mb-0 leading-tight">
                  {mceName}
                </h3>
                <p className="text-[#ffcc00] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold uppercase tracking-wider mb-0">
                  {mceTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B0000] sm:text-[12px]">
              Leadership
            </p>
            <h2 className="text-[#8B0000] text-[24px] sm:text-[28px] md:text-[32px] font-bold pb-[10px] mb-[18px] sm:mb-[22px] md:mb-[26px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:height-[3px] after:bg-[#ffcc00]">
              Message from the MCE
            </h2>

            <div className="relative rounded-[24px] border border-[#efe4d2] bg-[linear-gradient(180deg,#fffdf8,#fbf6ee)] p-5 pt-[16px] sm:p-6 sm:pt-[18px] md:p-7 md:pt-[20px]">
              <div className="absolute -top-4 left-3 text-[60px] sm:text-[70px] md:text-[80px] text-[#8B0000]/8 font-serif leading-none pointer-events-none">
                &ldquo;
              </div>

              <p className="text-readable text-[#333333] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.75] md:leading-[1.8] font-medium italic mb-[14px] sm:mb-[16px] md:mb-[18px]">
                &quot;{mceQuote}&quot;
              </p>

              <div className="space-y-[12px] sm:space-y-[14px] md:space-y-[16px] text-[#666666] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.7]">
                {mceIntro.map((paragraph) => (
                  <p key={paragraph} className="text-readable">{paragraph}</p>
                ))}
              </div>

              <div className="mt-[20px] sm:mt-[24px] md:mt-[28px]">
                <Link
                  href="/about/mce-profile"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8B0000] px-[22px] py-[12px] text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_16px_34px_rgba(139,0,0,0.24)] transition-standard hover:bg-[#6f0000] sm:px-[26px] sm:py-[13px] sm:text-[13px] md:px-[30px]"
                >
                  Read Full Profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
