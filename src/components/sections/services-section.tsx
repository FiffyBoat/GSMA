import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  DollarSign,
  Heart,
  Lightbulb,
} from "lucide-react";

interface ServicesSectionProps {
  intro: string;
  services: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    icon: "briefcase" | "heart" | "building" | "dollar" | "lightbulb";
  }>;
}

const iconMap = {
  briefcase: Briefcase,
  heart: Heart,
  building: Building2,
  dollar: DollarSign,
  lightbulb: Lightbulb,
};

export default function ServicesSection({
  intro,
  services,
}: ServicesSectionProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#faf8f4,#f4f1ea)] py-[44px] sm:py-[64px] md:py-[88px]">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-gray-900 mb-3 sm:mb-4">
            Our Services
          </h2>
          <p className="text-readable text-[14px] sm:text-[15px] md:text-[16px] text-gray-600 max-w-3xl mx-auto px-4">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="surface-card rounded-2xl hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,24,40,0.14)] transition-all duration-300 group overflow-hidden"
              >
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#8B0000] rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-bold text-gray-900 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-readable text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-[#8B0000] font-semibold text-[12px] sm:text-[13px] md:text-[14px] hover:gap-3 gap-2 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="h-1 bg-[#8B0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#8B0000] text-white font-bold text-[12px] sm:text-[13px] md:text-[14px] rounded hover:bg-[#6B0000] transition-colors"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
