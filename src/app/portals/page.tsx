import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { ExternalLink, CreditCard, FileText, Building, Users, Globe, Map, Shield } from "lucide-react";

const portals = [
  {
    name: "Ghana Revenue Authority",
    icon: CreditCard,
    description: "Access the GRA portal for tax-related services and payments",
    url: "https://gra.gov.gh",
    category: "Government"
  },
  {
    name: "Local Government Service",
    icon: Building,
    description: "Official website of the Local Government Service of Ghana",
    url: "https://lgs.gov.gh",
    category: "Government"
  },
  {
    name: "Ministry of Local Government",
    icon: Building,
    description: "Ministry responsible for local government administration",
    url: "https://mlgrd.gov.gh",
    category: "Government"
  },
  {
    name: "National Identification Authority",
    icon: Shield,
    description: "Ghana Card registration and verification services",
    url: "https://nia.gov.gh",
    category: "Government"
  },
  {
    name: "Births & Deaths Registry",
    icon: FileText,
    description: "Register births, deaths, and obtain certificates",
    url: "https://bdr.gov.gh",
    category: "Services"
  },
  {
    name: "Business Registration",
    icon: FileText,
    description: "Registrar General's Department - Business registration",
    url: "https://rgd.gov.gh",
    category: "Services"
  },
  {
    name: "Ghana Statistical Service",
    icon: Globe,
    description: "Access statistical data and census information",
    url: "https://statsghana.gov.gh",
    category: "Information"
  },
  {
    name: "Lands Commission",
    icon: Map,
    description: "Land registration and title verification services",
    url: "https://lc.gov.gh",
    category: "Services"
  }
];

const categories = ["All", "Government", "Services", "Information"];

export default function PortalsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Portals"
        breadcrumbs={[{ label: "Portals" }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Useful Links & Portals</h2>
            <p className="text-gray-600 leading-relaxed">
              Access important government portals and online services. These links provide quick access to various government agencies and services that residents may need.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-[#8B0000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portals.map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-[#8B0000] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B0000] transition-colors">
                    <portal.icon className="w-6 h-6 text-[#8B0000] group-hover:text-white transition-colors" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#8B0000] transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#8B0000] transition-colors">
                  {portal.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{portal.description}</p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {portal.category}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-16 bg-[#8B0000] rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Need Help Finding Something?</h2>
                <p className="text-white/90 mb-6">
                  If you cannot find the portal or service you are looking for, please contact our office for assistance.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#ffcc00] text-[#8B0000] font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  Contact Us
                </a>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white/80 text-sm mb-2">Customer Service Hours</p>
                <p className="text-white font-semibold">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-white/80 text-sm mt-4">Phone</p>
                <p className="text-white font-semibold">+233 (0) 302 907 141</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
