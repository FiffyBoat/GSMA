import DepartmentGrid from "@/components/sections/department-grid";
import Footer from "@/components/sections/footer";
import HeroSlider from "@/components/sections/hero-slider";
import LatestNews from "@/components/sections/latest-news";
import LeadershipHighlight from "@/components/sections/leadership-highlight";
import Navbar from "@/components/sections/navbar";
import ServicesSection from "@/components/sections/services-section";
import WelcomeSection from "@/components/sections/welcome-section";
import HomeClient from "@/components/home-client";
import { loadPublicSiteSettings } from "@/lib/public-site-settings";
import {
  splitSettingParagraphs,
  splitSettingRows,
} from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await loadPublicSiteSettings();
  const overviewIntro = splitSettingParagraphs(settings.about_overview_intro);
  const coreValues = splitSettingRows(settings.about_overview_core_values).map(
    ([title, description]) => ({ title, description })
  );
  const mceIntro = splitSettingParagraphs(settings.mce_intro).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <HomeClient>
        <Navbar />
        <HeroSlider />
        <WelcomeSection
          overviewIntro={overviewIntro}
          vision={settings.about_overview_vision}
          mission={settings.about_overview_mission}
          coreValues={coreValues}
          mceName={settings.mce_name}
          mceImageUrl={settings.mce_image_url}
        />
        <ServicesSection
          intro={settings.services_intro}
          services={[
            {
              id: "business-operating-permit",
              title: "Business Operating Permit",
              description: settings.business_permit_summary,
              href: "/services/business-operating-permit",
              icon: "briefcase",
            },
            {
              id: "marriage-license",
              title: "Marriage License",
              description: settings.marriage_license_summary,
              href: "/services/marriage-license",
              icon: "heart",
            },
            {
              id: "building-permit",
              title: "Building Permit",
              description: settings.building_permit_summary,
              href: "/services/building-permit",
              icon: "building",
            },
            {
              id: "property-rates",
              title: "Property Rates",
              description: settings.property_rates_summary,
              href: "/services/property-rates",
              icon: "dollar",
            },
            {
              id: "signage-permit",
              title: "Signage Permit",
              description: settings.signage_permit_summary,
              href: "/services/signage-permit",
              icon: "lightbulb",
            },
          ]}
        />
        <DepartmentGrid />
        <LatestNews />
        <LeadershipHighlight
          mceName={settings.mce_name}
          mceTitle={settings.mce_title}
          mceImageUrl={settings.mce_image_url}
          mceQuote={settings.mce_quote}
          mceIntro={mceIntro}
        />
        <Footer />
      </HomeClient>
    </main>
  );
}
