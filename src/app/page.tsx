import HeroSlider from "@/components/sections/hero-slider";
import WelcomeSection from "@/components/sections/welcome-section";
import ServicesSection from "@/components/sections/services-section";
import DepartmentGrid from "@/components/sections/department-grid";
import LeadershipHighlight from "@/components/sections/leadership-highlight";
import LatestNews from "@/components/sections/latest-news";
import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />
      <WelcomeSection />
      <ServicesSection />
      <DepartmentGrid />
      <LeadershipHighlight />
      <LatestNews />
      <Footer />
    </main>
  );
}
