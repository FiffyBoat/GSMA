import Footer from "@/components/sections/footer";
import HeroSlider from "@/components/sections/hero-slider";
import LatestNews from "@/components/sections/latest-news";
import LeadershipHighlight from "@/components/sections/leadership-highlight";
import Navbar from "@/components/sections/navbar";
import QuickAccessSection from "@/components/sections/quick-access-section";
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
  const overviewIntro = splitSettingParagraphs(settings.about_overview_intro).slice(
    0,
    2
  );
  const coreValues = splitSettingRows(settings.about_overview_core_values).map(
    ([title, description]) => ({ title, description })
  );
  const mceIntro = splitSettingParagraphs(settings.mce_intro).slice(0, 1);

  return (
    <main className="min-h-screen bg-white">
      <HomeClient>
        <Navbar />
        <HeroSlider />
        <QuickAccessSection />
        <LatestNews />
        <WelcomeSection
          overviewIntro={overviewIntro}
          vision={settings.about_overview_vision}
          mission={settings.about_overview_mission}
          coreValues={coreValues}
          showMceCard={false}
        />
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
