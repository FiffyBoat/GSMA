import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import PageHeader from "@/components/shared/PageHeader";
import { Users, Briefcase, Scale, FileCheck, Gavel, Building2 } from "lucide-react";

const committees = [
  {
    name: "Executive Committee",
    icon: Briefcase,
    description: "The Executive Committee is the highest decision-making body of the Assembly, responsible for overseeing the day-to-day administration and implementation of policies.",
    members: "MCE (Chair), Presiding Member, 2/3 of Sub-Committee Chairs",
    responsibilities: [
      "Day-to-day administration of the Assembly",
      "Implementation of Assembly decisions",
      "Emergency decision making",
      "Coordination of sub-committees"
    ]
  },
  {
    name: "Development Planning Sub-Committee",
    icon: Building2,
    description: "Responsible for formulating and monitoring the implementation of development plans and projects within the municipality.",
    members: "10 Members including technical officers",
    responsibilities: [
      "Preparation of medium-term development plans",
      "Monitoring of development projects",
      "Spatial planning coordination",
      "Environmental management oversight"
    ]
  },
  {
    name: "Social Services Sub-Committee",
    icon: Users,
    description: "Oversees social development programmes including education, health, water and sanitation, and community development.",
    members: "8 Members including sector heads",
    responsibilities: [
      "Education and health programmes oversight",
      "Water and sanitation projects",
      "Youth and sports development",
      "Gender and social protection"
    ]
  },
  {
    name: "Finance & Administration Sub-Committee",
    icon: Scale,
    description: "Responsible for the financial management, revenue mobilization, and administrative matters of the Assembly.",
    members: "8 Members including finance officer",
    responsibilities: [
      "Budget preparation and monitoring",
      "Revenue mobilization strategies",
      "Human resource management",
      "Asset management"
    ]
  },
  {
    name: "Works Sub-Committee",
    icon: FileCheck,
    description: "Oversees infrastructure development, road construction, drainage systems, and maintenance of public buildings.",
    members: "8 Members including works engineer",
    responsibilities: [
      "Road construction and maintenance",
      "Drainage and sanitation infrastructure",
      "Public building maintenance",
      "Contract monitoring"
    ]
  },
  {
    name: "Justice Sub-Committee",
    icon: Gavel,
    description: "Handles matters relating to bye-laws, conflict resolution, and judicial functions of the Assembly.",
    members: "7 Members including legal officer",
    responsibilities: [
      "Bye-law formulation and enforcement",
      "Conflict resolution and mediation",
      "Public tribunal oversight",
      "Legal affairs coordination"
    ]
  }
];

export default function UnitsCommitteesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHeader
        title="Units & Committees"
        breadcrumbs={[{ label: "Units & Committees" }]}
      />

      <section className="py-[40px] sm:py-[60px] md:py-[80px]">
        <div className="container mx-auto px-[20px] sm:px-[24px] md:px-[32px]">
          <div className="max-w-3xl mb-[36px] sm:mb-[44px] md:mb-[52px]">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[16px] sm:mb-[18px] md:mb-[20px]">Sub-Committees of the Assembly</h2>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
              The Ga South Municipal Assembly operates through various sub-committees that are responsible for specific areas of governance and development. These committees ensure effective deliberation and implementation of programmes across all sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px]">
            {committees.map((committee) => (
              <div key={committee.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-[#8B0000] px-[16px] sm:px-[18px] md:px-[20px] lg:px-[24px] py-[12px] sm:py-[14px] md:py-[16px] lg:py-[18px] flex items-center gap-[12px] sm:gap-[14px]">
                  <committee.icon className="w-[20px] sm:w-[22px] md:w-[24px] h-[20px] sm:h-[22px] md:h-[24px] text-white shrink-0" />
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-bold text-white\">{committee.name}</h3>
                </div>
                <div className="p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px]">
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600 mb-[12px] sm:mb-[14px] md:mb-[16px]">{committee.description}</p>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px] mb-[12px] sm:mb-[14px] md:mb-[16px]">
                    <span className="font-semibold text-gray-900">Composition: </span>
                    <span className="text-gray-600">{committee.members}</span>
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 text-[12px] sm:text-[13px] md:text-[14px] mb-[8px] sm:mb-[10px]">Key Responsibilities:</p>
                    <ul className="space-y-[6px] sm:space-y-[8px]">
                      {committee.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-[8px] sm:gap-[10px] text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">
                          <span className="w-[5px] h-[5px] bg-[#8B0000] rounded-full mt-[4px] sm:mt-[5px] shrink-0"></span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[44px] sm:mt-[52px] md:mt-[60px] lg:mt-[72px] bg-gray-50 p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] rounded-lg">
            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-[20px] sm:mb-[24px] md:mb-[28px]">Special Units</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] sm:gap-[16px] md:gap-[18px] lg:gap-[20px]">
              <div className="bg-white p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 text-[14px] sm:text-[15px] md:text-[16px] mb-[8px] sm:mb-[10px]">Internal Audit Unit</h3>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">Ensures compliance with financial regulations and procedures, and conducts regular audits of all departments.</p>
              </div>
              <div className="bg-white p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 text-[14px] sm:text-[15px] md:text-[16px] mb-[8px] sm:mb-[10px]">Budget Unit</h3>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">Coordinates the preparation, implementation, and monitoring of the Assembly's annual budget.</p>
              </div>
              <div className="bg-white p-[14px] sm:p-[16px] md:p-[18px] lg:p-[20px] rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 text-[14px] sm:text-[15px] md:text-[16px] mb-[8px] sm:mb-[10px]">Management Information System (MIS)</h3>
                <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-600">Manages information technology infrastructure and provides technical support to all departments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
