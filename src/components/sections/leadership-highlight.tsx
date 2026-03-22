import Image from "next/image";
import Link from "next/link";
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
    <section className="py-[44px] sm:py-[64px] md:py-[88px] bg-white">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-start gap-[25px] sm:gap-[28px] md:gap-[30px]">
          <div className="w-full lg:w-5/12">
            <div className="relative overflow-hidden shadow-card border border-[#E0E0E0] rounded-lg">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                <Image
                  src={normalizeSupabaseImageUrl(mceImageUrl)}
                  alt={`${mceName} - Municipal Chief Executive`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-ghana-green px-[15px] sm:px-[18px] md:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] md:py-[16px]">
                <h3 className="text-white text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold mb-0 leading-tight">
                  {mceName}
                </h3>
                <p className="text-ghana-gold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold uppercase tracking-wider mb-0">
                  {mceTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <h2 className="text-[#8B0000] text-[24px] sm:text-[28px] md:text-[32px] font-bold pb-[10px] mb-[20px] sm:mb-[24px] md:mb-[30px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:height-[3px] after:bg-ghana-green">
              Message from the MCE
            </h2>

            <div className="relative pt-[12px] sm:pt-[14px] md:pt-[16px]">
              <div className="absolute -top-4 -left-2 text-[60px] sm:text-[70px] md:text-[80px] text-ghana-green/10 font-serif leading-none pointer-events-none">
                &ldquo;
              </div>

              <p className="text-readable text-[#333333] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] leading-[1.7] md:leading-[1.8] font-medium italic mb-[16px] sm:mb-[18px] md:mb-[20px] lg:mb-[24px]">
                &quot;{mceQuote}&quot;
              </p>

              <div className="space-y-[12px] sm:space-y-[14px] md:space-y-[16px] text-[#666666] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.5] sm:leading-[1.6] md:leading-[1.6]">
                {mceIntro.map((paragraph) => (
                  <p key={paragraph} className="text-readable">{paragraph}</p>
                ))}
              </div>

              <div className="mt-[20px] sm:mt-[24px] md:mt-[28px] lg:mt-[32px]">
                <Link
                  href="/about/mce-profile"
                  className="inline-block bg-ghana-green text-white px-[24px] sm:px-[28px] md:px-[32px] lg:px-[40px] py-[10px] sm:py-[12px] md:py-[13px] lg:py-[14px] rounded-md font-semibold text-[12px] sm:text-[13px] md:text-[14px] uppercase tracking-wide hover:bg-ghana-gold hover:text-[#333333] transition-standard shadow-sm"
                >
                  Read Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
