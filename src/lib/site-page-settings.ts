import type { SettingInputType } from "./profile-settings";

export type SitePageSettingsSectionId =
  | "overview"
  | "contact"
  | "portals"
  | "services-index"
  | "business-permit"
  | "building-permit"
  | "marriage-license"
  | "property-rates"
  | "signage-permit"
  | "units-committees";

export interface SitePageSettingsSection {
  id: SitePageSettingsSectionId;
  title: string;
  description: string;
}

export interface SitePageSettingDefinition {
  key: string;
  label: string;
  type: SettingInputType;
  section: SitePageSettingsSectionId;
  defaultValue: string;
  description?: string;
  isImage?: boolean;
}

export const SITE_PAGE_SETTINGS_SECTIONS: SitePageSettingsSection[] = [
  {
    id: "overview",
    title: "About Overview",
    description:
      "Manage the public overview page content, facts, mission, and values.",
  },
  {
    id: "contact",
    title: "Contact Page",
    description:
      "Manage the public contact page details, social links, and map embed.",
  },
  {
    id: "portals",
    title: "Portals Page",
    description:
      "Manage useful external links and the support callout on the portals page.",
  },
  {
    id: "services-index",
    title: "Services Index",
    description:
      "Manage the public services landing page introduction and support message.",
  },
  {
    id: "business-permit",
    title: "Business Operating Permit",
    description:
      "Manage the business permit page sections, requirements, and quick information.",
  },
  {
    id: "building-permit",
    title: "Building Permit",
    description:
      "Manage the building permit page content, tables, and notices.",
  },
  {
    id: "marriage-license",
    title: "Marriage License",
    description:
      "Manage the marriage license page guidance, steps, and fees.",
  },
  {
    id: "property-rates",
    title: "Property Rates",
    description:
      "Manage the property rates page content, payment methods, and notices.",
  },
  {
    id: "signage-permit",
    title: "Signage Permit",
    description:
      "Manage the signage permit page content, regulations, and permit fees.",
  },
  {
    id: "units-committees",
    title: "Units & Committees",
    description:
      "Manage the committees page introduction, committees, and special units.",
  },
];

export const SITE_PAGE_SETTING_DEFINITIONS: SitePageSettingDefinition[] = [
  {
    key: "about_overview_intro",
    label: "Overview Introduction",
    type: "textarea",
    section: "overview",
    defaultValue:
      "The Ga South Municipal Assembly (GSMA) is one of the twenty-nine (29) administrative districts in the Greater Accra Region of Ghana. The Assembly was created by Legislative Instrument (L.I. 2137) in 2012 when the then Ga South District was upgraded to a Municipal status. The Municipality is located at the south-western part of the Greater Accra Region.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "about_overview_history",
    label: "Overview History",
    type: "textarea",
    section: "overview",
    defaultValue:
      "The Ga South Municipal Assembly is one of the newly created Assemblies in the Greater Accra Region with its capital being Ngleshie Amanfro. The Assembly was established by a Legislative Instrument (2316). It was created to further enhance and facilitate grassroots decision making and development through effective administration and development planning. It was officially inaugurated on Thursday 15th March, 2018.\n\nGa South Municipal Assembly (Ngleshie Amanfro) has since become one of the Two Hundred and Fifty-Four (254) Metropolitan, Municipal and District Assemblies (MMDAs) in Ghana and among the twenty-Six (26) MMDAs in the Greater Accra Region. It was carved from the then old Ga South Municipal Assembly (Weija) in November 2017. The Municipal Assembly currently has 2 Zonal Councils (Domeabra and Obom) which operate below the Assembly structure.\n\nThe General Assembly including the Municipal Chief Executive has a membership of Thirty (30) comprising Nineteen (19) Elected Members, Eight (8) Government Appointees, 2 Members of Parliament (Ngleshie Amanfro-Bortianor and Obom-Domeabra Constituencies). The Municipal Chief Executive who was appointed by the President and approved by the General Assembly happens to be the political head of the entire Municipality while the Municipal Coordinating Director is the administrative head.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "about_overview_vision",
    label: "Vision",
    type: "textarea",
    section: "overview",
    defaultValue:
      "A well-managed city of excellence for service delivery for citizens and business prosperity.",
  },
  {
    key: "about_overview_mission",
    label: "Mission",
    type: "textarea",
    section: "overview",
    defaultValue:
      "The Ga South Municipal Assembly exists to provide an effective and efficient service delivery to ensure quality and dignified life for all citizens and business through balanced and excellent delivery of socio-economic policies within the context of good local governance.",
  },
  {
    key: "about_overview_core_values",
    label: "Core Values",
    type: "textarea",
    section: "overview",
    defaultValue:
      "Excellence | Delivering outstanding service in all we do.\nSmartness | Innovative and intelligent approaches to challenges.\nProactiveness | Taking initiative in addressing issues.\nRespect | Valuing all stakeholders and their perspectives.\nTeamwork | Collaborating to achieve common goals.",
    description: "Use one value per line in the format: Title | Description",
  },
  {
    key: "about_overview_key_facts",
    label: "Key Facts",
    type: "textarea",
    section: "overview",
    defaultValue:
      "341 km² | Total Land Area\n485,643 | Population (2021 Census)\n19 | Electoral Areas",
    description: "Use one fact per line in the format: Value | Label",
  },
  {
    key: "about_overview_boundaries",
    label: "Location & Boundaries",
    type: "textarea",
    section: "overview",
    defaultValue:
      "The Ga South Municipality shares boundaries with Weija-Gbawe Municipal to the East, Ga Central Municipal to the North-East, Ga West Municipal to the North, Awutu Senya East District to the West, and the Gulf of Guinea to the South. The strategic location of the municipality makes it a hub for residential, commercial, and industrial activities.",
  },
  {
    key: "contact_intro",
    label: "Contact Intro",
    type: "textarea",
    section: "contact",
    defaultValue:
      "We are here to help and answer any questions you might have. We look forward to hearing from you.",
  },
  {
    key: "contact_address_lines",
    label: "Address Lines",
    type: "textarea",
    section: "contact",
    defaultValue:
      "P. O. Box WJ 305\nNgleshie Amanfro\nBehind Galilea Market",
    description: "Add one address line per row.",
  },
  {
    key: "contact_digital_address",
    label: "Digital Address",
    type: "text",
    section: "contact",
    defaultValue: "GS0623-8123",
  },
  {
    key: "contact_phone_lines",
    label: "Phone Lines",
    type: "textarea",
    section: "contact",
    defaultValue: "+233 (0)30 290 8466\n+233 (0)30 290 8467",
    description: "Add one phone number per row.",
  },
  {
    key: "contact_email",
    label: "Contact Email",
    type: "text",
    section: "contact",
    defaultValue: "info@gsma.gov.gh",
  },
  {
    key: "contact_hours_lines",
    label: "Working Hours",
    type: "textarea",
    section: "contact",
    defaultValue:
      "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday & Sunday: Closed",
    description: "Add one schedule line per row.",
  },
  {
    key: "contact_facebook_url",
    label: "Facebook URL",
    type: "text",
    section: "contact",
    defaultValue: "https://web.facebook.com/gasouthmunicipal",
  },
  {
    key: "contact_twitter_url",
    label: "X / Twitter URL",
    type: "text",
    section: "contact",
    defaultValue: "https://x.com/GaSouthAssembly",
  },
  {
    key: "contact_instagram_url",
    label: "Instagram URL",
    type: "text",
    section: "contact",
    defaultValue: "https://www.instagram.com/gasouthmunicipalassembly/",
  },
  {
    key: "contact_youtube_url",
    label: "YouTube URL",
    type: "text",
    section: "contact",
    defaultValue: "https://www.youtube.com/channel/UCJcI5FHNEmZQjNvZ3_hkRpg",
  },
  {
    key: "contact_form_intro",
    label: "Contact Form Intro",
    type: "textarea",
    section: "contact",
    defaultValue:
      "Fill out the form below and we will respond as soon as possible.",
  },
  {
    key: "contact_map_embed_url",
    label: "Map Embed or Share URL",
    type: "textarea",
    section: "contact",
    defaultValue:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127065.46846890387!2d-0.3076706!3d5.5912456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a7624b6c7d1%3A0x87b9e1a8fcc1f4c0!2sGa%20South%20Municipal%20Assembly!5e0!3m2!1sen!2sgh!4v1635000000000!5m2!1sen!2sgh",
    description:
      "You can paste either a Google Maps embed URL or a normal Google Maps share link here.",
  },
  {
    key: "contact_map_share_url",
    label: "Google Maps Share URL",
    type: "text",
    section: "contact",
    defaultValue: "https://maps.app.goo.gl/7RuMrScQpjhc6x9M8",
    description:
      "This is used for the public 'Open in Google Maps' link. It can be a normal Google Maps share URL.",
  },
  {
    key: "portals_intro",
    label: "Portals Intro",
    type: "textarea",
    section: "portals",
    defaultValue:
      "Access important government portals and online services. These links provide quick access to various government agencies and services that residents may need.",
  },
  {
    key: "portals_items",
    label: "Portal Items",
    type: "textarea",
    section: "portals",
    defaultValue:
      "Government | Ghana Revenue Authority | https://gra.gov.gh | Access the GRA portal for tax-related services and payments\nGovernment | Local Government Service | https://lgs.gov.gh | Official website of the Local Government Service of Ghana\nGovernment | Ministry of Local Government | https://mlgrd.gov.gh | Ministry responsible for local government administration\nGovernment | National Identification Authority | https://nia.gov.gh | Ghana Card registration and verification services\nServices | Births & Deaths Registry | https://bdr.gov.gh | Register births, deaths, and obtain certificates\nServices | Business Registration | https://rgd.gov.gh | Registrar General's Department - Business registration\nInformation | Ghana Statistical Service | https://statsghana.gov.gh | Access statistical data and census information\nServices | Lands Commission | https://lc.gov.gh | Land registration and title verification services",
    description:
      "Use one item per line in the format: Category | Name | URL | Description",
  },
  {
    key: "portals_cta_title",
    label: "Portals CTA Title",
    type: "text",
    section: "portals",
    defaultValue: "Need Help Finding Something?",
  },
  {
    key: "portals_cta_body",
    label: "Portals CTA Body",
    type: "textarea",
    section: "portals",
    defaultValue:
      "If you cannot find the portal or service you are looking for, please contact our office for assistance.",
  },
  {
    key: "portals_cta_hours",
    label: "Portals CTA Hours",
    type: "text",
    section: "portals",
    defaultValue: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  {
    key: "portals_cta_phone",
    label: "Portals CTA Phone",
    type: "text",
    section: "portals",
    defaultValue: "+233 (0) 302 907 141",
  },
  {
    key: "services_intro",
    label: "Services Intro",
    type: "textarea",
    section: "services-index",
    defaultValue:
      "The Ga South Municipal Assembly provides essential services to residents and businesses. Click on any service below to learn more about the requirements and application process.",
  },
  {
    key: "services_assistance_body",
    label: "Services Assistance Body",
    type: "textarea",
    section: "services-index",
    defaultValue:
      "Our customer service team is available to help you with any questions about our services. Visit our office or contact us for more information.",
  },
  {
    key: "business_permit_summary",
    label: "Business Permit Summary",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Register your business and obtain the necessary permits to operate legally within the Ga South Municipality.",
  },
  {
    key: "business_permit_overview",
    label: "Business Permit Overview",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "It is mandatory to obtain a business license from the Ga South Municipal Assembly (GSMA) if you want to establish a business in Ngleshie Amanfro. Any person who sets up a business to operate either within the limits of the city or outside the city is obligated to apply for a Business License by law. This license expires on 31st December of each year and must be renewed yearly at a fee.\n\nThis Revenue Unit of the Municipal Assembly is in charge of fees. The Business License Division is located on the Kasoa Accra road behind Galilea Market. Our hours of operation are Monday to Friday, 8 AM to 5 PM. For more information do contact the revenue unit which is on the ground floor of the office of the Assembly.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "business_permit_process",
    label: "Business Permit Process Steps",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Write an application or introductory letter to the Metropolitan Chief Executive stating the name of business, type of business and location of business.\nAdd all relevant documents (Certificate to Commence Business, Certificate of Incorporation, etc.)\nCross check of the relevant documents with the Registrar General Department and other issuing authority like the Bank of Ghana for financial institutions.\nInspection of office premises if necessary.\nA bill is generated and served on the applicant based on the Fee Fixing Resolution of the Ga South Municipal Assembly depending on the type and location of the business.\nA receipt and a certificate are issued after payment.\nThe certificate is renewable yearly.",
    description: "Add one process step per line.",
  },
  {
    key: "business_permit_apply",
    label: "Apply for Business License",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "The Ga South Municipal Assembly requires that anyone or organization intending to carry on a business or profession as a whole should first endeavour to apply for an Operating Licence to make legal the existence of the business. Applications for this licence are done at the Revenue Unit of the Municipality on the ground floor as indicated earlier.",
  },
  {
    key: "business_permit_changes",
    label: "Business Changes & Closures",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Any change of name of business or closure of business should be communicated to the same outfit so that records can be updated for future decisions. Please note that an operating licence is not transferable. Transfer of ownership is considered termination of licence agreement. A new business cannot use the licence of an old business.",
  },
  {
    key: "business_permit_renewals",
    label: "Business License Renewals",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Businesses in the Municipality must renew their Business Operating Permits every December 31st. The renewal can be done using the same procedure passed through in applying for the operating licence.",
  },
  {
    key: "business_permit_payment_modes",
    label: "Business Permit Payment Modes",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Cash\nBankers Draft\nPayment Order\nCheque from good and loyal rate payers",
    description: "Add one payment mode per line.",
  },
  {
    key: "business_permit_requirements",
    label: "Business Permit Requirements",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Completed application form\nValid National ID (Ghana Card)\nPassport-sized photographs (2)\nBusiness registration certificate from Registrar General's Department\nTax Identification Number (TIN)\nProof of business location (tenancy agreement or property documents)\nEnvironmental and Health Permit (for applicable businesses)\nFire Safety Certificate (for applicable businesses)\nSite plan of business premises",
    description: "Add one requirement per line.",
  },
  {
    key: "business_permit_fees",
    label: "Business Permit Fees",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Small Scale Business | GHS 100 - 300\nMedium Scale Business | GHS 300 - 800\nLarge Scale Business | GHS 800 - 2,000\nIndustrial/Manufacturing | GHS 2,000+",
    description: "Use one fee row per line in the format: Category | Amount",
  },
  {
    key: "business_permit_notice",
    label: "Business Permit Notice",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Fees may vary based on the nature, size, and location of your business. Please visit our office for an accurate assessment of your permit fees.",
  },
  {
    key: "business_permit_processing_time",
    label: "Business Permit Processing Time",
    type: "text",
    section: "business-permit",
    defaultValue: "5-10 working days",
  },
  {
    key: "business_permit_where_to_apply",
    label: "Business Permit Where to Apply",
    type: "textarea",
    section: "business-permit",
    defaultValue:
      "Revenue Unit, GSMA Office\nKasoa Accra Road, behind Galilea Market\nNgleshie Amanfro",
    description: "Add one address line per row.",
  },
  {
    key: "business_permit_office_hours",
    label: "Business Permit Office Hours",
    type: "textarea",
    section: "business-permit",
    defaultValue: "Monday to Friday\n8 AM to 5 PM",
    description: "Add one line per row.",
  },
  {
    key: "business_permit_contact",
    label: "Business Permit Contact",
    type: "text",
    section: "business-permit",
    defaultValue: "+233 (0)30 290 8466/7",
  },
  {
    key: "building_permit_summary",
    label: "Building Permit Summary",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Obtain approval for construction, renovation, or demolition projects within the municipality.",
  },
  {
    key: "building_permit_overview",
    label: "Building Permit Overview",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "A Building Permit is a mandatory authorization required before commencing any construction, renovation, or demolition work within the Ga South Municipality. This permit ensures that all construction activities comply with local building codes, zoning regulations, and safety standards.\n\nThe permit process helps protect property owners, neighbors, and the community by ensuring buildings are safe, structurally sound, and appropriately located. Constructing without a valid permit is illegal and may result in fines, demolition orders, or legal action.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "building_permit_types",
    label: "Building Permit Types",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Residential Building | Single-family homes, duplexes, apartments | 14-21 days\nCommercial Building | Shops, offices, warehouses | 21-30 days\nIndustrial Building | Factories, manufacturing plants | 30-45 days\nRenovation/Extension | Modifications to existing structures | 7-14 days\nDemolition | Complete or partial demolition | 7-14 days",
    description:
      "Use one type per line in the format: Type | Description | Processing time",
  },
  {
    key: "building_permit_requirements",
    label: "Building Permit Requirements",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Completed building permit application form\nValid National ID (Ghana Card)\nProof of land ownership (land title, deed of assignment, etc.)\nArchitectural drawings (site plan, floor plans, elevations, sections)\nStructural drawings and calculations\nElectrical and plumbing layouts\nEnvironmental Impact Assessment (for large projects)\nTax Identification Number (TIN)\nProof of payment of property rate\nSurvey plan from licensed surveyor",
    description: "Add one requirement per line.",
  },
  {
    key: "building_permit_steps",
    label: "Building Permit Steps",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Pre-Application Consultation | Visit the Works Department to discuss your project and get guidance on requirements.\nPrepare Documents | Engage licensed professionals to prepare all required drawings and documents.\nSubmit Application | Submit completed application form with all supporting documents to the Works Department.\nDocument Review | Technical team reviews your documents for compliance with building codes and regulations.\nSite Inspection | Physical inspection of the site to verify information and assess suitability.\nDevelopment Control Board | Application is presented to the Development Control Board for approval.\nPayment & Collection | Upon approval, pay the permit fee and collect your building permit.",
    description: "Use one step per line in the format: Title | Description",
  },
  {
    key: "building_permit_fees",
    label: "Building Permit Fees",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Residential (up to 200 sqm) | GHS 500 - 1,500\nResidential (above 200 sqm) | GHS 1,500 - 3,000\nCommercial | GHS 2,000 - 10,000\nIndustrial | GHS 5,000 - 20,000\nRenovation/Extension | GHS 300 - 1,000\nDemolition | GHS 200 - 500",
    description: "Use one fee row per line in the format: Category | Amount",
  },
  {
    key: "building_permit_warning",
    label: "Building Permit Warning",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Construction without a valid building permit is a criminal offense. Offenders face penalties including fines, stop-work orders, and potential demolition of unauthorized structures at the owner's expense.",
  },
  {
    key: "building_permit_notice",
    label: "Building Permit Notice",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Fees are subject to change. Please contact the Works Department for current fee schedules. Permit fees are calculated based on the building size, type, and location.",
  },
  {
    key: "building_permit_processing_time",
    label: "Building Permit Processing Time",
    type: "text",
    section: "building-permit",
    defaultValue: "14-45 days (varies by type)",
  },
  {
    key: "building_permit_where_to_apply",
    label: "Building Permit Where to Apply",
    type: "textarea",
    section: "building-permit",
    defaultValue: "Works Department\nGSMA Office, Ngleshie Amanfro",
    description: "Add one address line per row.",
  },
  {
    key: "building_permit_contact",
    label: "Building Permit Contact",
    type: "text",
    section: "building-permit",
    defaultValue: "+233 (0)30 290 8466/7",
  },
  {
    key: "building_permit_validity",
    label: "Building Permit Validity",
    type: "textarea",
    section: "building-permit",
    defaultValue:
      "Building permits are valid for 2 years from the date of issue. Extensions may be granted upon application before expiry.",
  },
  {
    key: "marriage_license_summary",
    label: "Marriage License Summary",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Apply for an official marriage license to legally solemnize your union at the Ga South Municipal Assembly.",
  },
  {
    key: "marriage_license_overview",
    label: "Marriage License Overview",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Metropolitan, Municipal and District Assemblies (MMDAs) are mandated by the Marriage Act 1884-1985 to register and officiate marriages. The Marriage Registry of the Ga South Municipal Assembly commenced its operations in September, 2018.\n\nThe Unit renders services such as ordinance and customary marriages.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "marriage_license_ordinance_body",
    label: "Ordinance Marriage",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Couples from gazetted churches are registered and given a 21-day notice, which is later given to their Ministers at their respective churches for publication. Upon maturity of the notice, either of the couples returns for the Registrar's Certificate. Couples whose churches are not gazetted or couples who want to sign at the Registry of the Assembly are given a date, usually Fridays, to come along with their witnesses. A ceremony is performed, couples exchange vows and rings, and later append their signatures after which a certificate of marriage is presented to the couples.",
  },
  {
    key: "marriage_license_customary_body",
    label: "Customary Marriage",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Customary Marriage certificates are also issued to couples who prefer the customary to the ordinance. Couples are also given a 21-day period after which they are issued with the Marriage Certificate.",
  },
  {
    key: "marriage_license_eligibility",
    label: "Marriage Eligibility Items",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Both parties must be at least 18 years old\nNot currently married to another person\nNot within prohibited degrees of relationship\nMental capacity to consent",
    description: "Add one eligibility item per line.",
  },
  {
    key: "marriage_license_requirements",
    label: "Marriage Requirements",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Completed marriage license application form\nValid National ID (Ghana Card) for both parties\nBirth certificates of both parties\nPassport-sized photographs (4 each)\nProof of residence in Ga South Municipality\nDeath certificate of former spouse (if widowed)\nDivorce certificate (if previously divorced)\nParental consent (if under 21 years)\nTwo witnesses with valid IDs",
    description: "Add one requirement per line.",
  },
  {
    key: "marriage_license_steps",
    label: "Marriage Steps",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Notice of Marriage | Both parties must appear at the GSMA office to give notice of their intention to marry.\nSubmit Documents | Submit all required documents along with the completed application form.\nPublication Period | A 21-day publication period follows to allow for any objections to the marriage.\nPay License Fee | After the publication period, pay the marriage license fee at the Finance Department.\nCollect License | Collect your marriage license from the Births and Deaths Registry Unit.\nMarriage Ceremony | The marriage can be solemnized within 3 months of the license issuance.",
    description: "Use one step per line in the format: Title | Description",
  },
  {
    key: "marriage_license_fees",
    label: "Marriage Fees",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Marriage License Fee | GHS 200\nPublication Fee | GHS 50\nCertificate Fee | GHS 100\nCeremony at Assembly Hall | GHS 500",
    description: "Use one fee row per line in the format: Service | Amount",
  },
  {
    key: "marriage_license_notice",
    label: "Marriage Notice",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Both parties must be present for the initial application. Foreign nationals may require additional documentation including a valid visa and letter from their embassy.",
  },
  {
    key: "marriage_license_processing_time",
    label: "Marriage Processing Time",
    type: "text",
    section: "marriage-license",
    defaultValue: "21 days (publication period)",
  },
  {
    key: "marriage_license_where_to_apply",
    label: "Marriage Where to Apply",
    type: "textarea",
    section: "marriage-license",
    defaultValue:
      "Births & Deaths Registry\nGSMA Office, Ngleshie Amanfro",
    description: "Add one address line per row.",
  },
  {
    key: "marriage_license_contact",
    label: "Marriage Contact",
    type: "text",
    section: "marriage-license",
    defaultValue: "+233 (0)30 290 8466/7",
  },
  {
    key: "property_rates_summary",
    label: "Property Rates Summary",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Pay your annual property rates as required by law. Property rates finance local government services and infrastructure.",
  },
  {
    key: "property_rates_overview",
    label: "Property Rates Overview",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Property rates are annual taxes levied on all properties within the Ga South Municipality. These rates are essential for financing local government services and infrastructure development. All property owners are obligated by law to pay their annual property rates.\n\nProperty rates must be paid annually. Failure to pay may result in penalties, property liens, or legal action.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "property_rates_categories",
    label: "Property Rate Categories",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Residential Property | Single-family homes, apartments, residential compounds | 0.1 - 0.5% of assessed value\nCommercial Property | Shops, offices, commercial centers | 0.5 - 1.0% of assessed value\nIndustrial Property | Factories, warehouses, manufacturing facilities | 0.5 - 1.0% of assessed value\nAgricultural Land | Farmland, plantations, agricultural facilities | 0.05 - 0.2% of assessed value\nVacant Land | Unoccupied land within the municipality | 0.1 - 0.3% of assessed value",
    description:
      "Use one category per line in the format: Type | Description | Rate",
  },
  {
    key: "property_rates_requirements",
    label: "Property Rates Requirements",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Valid National ID (Ghana Card)\nProof of property ownership (land title, deed, etc.)\nSurvey plan or property reference map\nPrevious property rate receipt (if applicable)\nProof of payment for previous years (if applicable)",
    description: "Add one requirement per line.",
  },
  {
    key: "property_rates_steps",
    label: "Property Rates Steps",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Property Registration | Ensure your property is properly registered with the Land Commission and the Assembly.\nProperty Valuation | The Assembly conducts property valuation to determine the assessed value for rating purposes.\nRate Assessment Notice | You receive a Rate Assessment Notice showing your property value and calculated annual rate.\nReview Assessment | Review the assessment and lodge any objections within the stipulated period if applicable.\nPayment | Pay your annual property rates at designated payment centers or online.\nReceipt | Obtain official receipt as proof of payment for your records.",
    description: "Use one step per line in the format: Title | Description",
  },
  {
    key: "property_rates_payment_methods",
    label: "Property Rates Payment Methods",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Bank Transfer | Direct payment to the Assembly's bank account\nCash Payment | Pay at Finance Department office\nMobile Money | Through approved mobile money services\nCheque | Bank cheque payments accepted",
    description: "Use one method per line in the format: Method | Details",
  },
  {
    key: "property_rates_assistance_body",
    label: "Property Rates Assistance Body",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Contact the Finance Department for rate inquiries and payment assistance.\nFinance Office\nMunicipal Assembly Headquarters",
    description: "Add one line per row.",
  },
  {
    key: "property_rates_important_notes",
    label: "Property Rates Important Notes",
    type: "textarea",
    section: "property-rates",
    defaultValue:
      "Property rates are due and payable annually by March 31st\nLate payment may attract penalties\nProperty owners can request a revaluation within 30 days of assessment\nReceipts must be retained as proof of payment\nNon-payment may result in legal action and property liens",
    description: "Add one note per line.",
  },
  {
    key: "signage_permit_summary",
    label: "Signage Permit Summary",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Obtain approval for business and advertising signage within the municipality.",
  },
  {
    key: "signage_permit_overview",
    label: "Signage Permit Overview",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "A signage permit is required from the Ga South Municipal Assembly for any business or advertising signs within the municipality. This permit ensures that all signage complies with planning regulations, safety standards, and aesthetic requirements to maintain the visual quality of our communities.\n\nAll signs, including building signs, billboards, and digital displays, require prior approval before installation.",
    description: "Use blank lines to separate paragraphs.",
  },
  {
    key: "signage_permit_types",
    label: "Signage Types",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Building/Facade Signage | Signs attached to buildings, storefronts, or building surfaces | 7-14 days\nBillboard/Hoarding | Large standalone advertising structures | 14-21 days\nStreet/Pole Signage | Signs mounted on poles along streets and roads | 7-14 days\nDigital/LED Signage | Electronic and illuminated signage | 14-21 days\nDirectional Signage | Wayfinding and directional signs | 5-10 days\nTemporary Signage | Event or promotional signage (temporary period) | 3-5 days",
    description:
      "Use one signage type per line in the format: Type | Description | Processing time",
  },
  {
    key: "signage_permit_requirements",
    label: "Signage Requirements",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Completed signage permit application form\nValid National ID (Ghana Card)\nProof of land/building ownership or authorization letter from owner\nDetailed site plan showing signage location and dimensions\nDesign drawings or mockup of the signage\nPhotographs of the proposed location\nTax Identification Number (TIN)\nProof of business registration/license\nEnvironmental clearance certificate (if applicable)",
    description: "Add one requirement per line.",
  },
  {
    key: "signage_permit_steps",
    label: "Signage Steps",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Pre-Application Inspection | Visit the Development Planning Department to discuss your signage proposal and location.\nPrepare Application | Complete the signage permit application form with all required supporting documents.\nSubmit Application | Submit your completed application to the Development Planning Department.\nDocument Review | Planning officers review your documents for compliance with signage regulations.\nSite Assessment | Physical inspection of the proposed location to verify suitability and assess impact.\nPlanning Committee Review | Application is reviewed by the planning committee for final approval.\nPayment & Collection | Upon approval, pay the permit fee and collect your signage permit.",
    description: "Use one step per line in the format: Title | Description",
  },
  {
    key: "signage_permit_regulations",
    label: "Signage Regulations",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Signage must not obstruct traffic views or create safety hazards\nMaximum height and size restrictions based on location\nMust comply with architectural aesthetics of the area\nNo signage on restricted areas (heritage sites, protected areas)\nIlluminated signs must not cause nuisance to adjacent properties\nAll signage must be properly maintained and safe\nAdvertisements must not be offensive or misleading",
    description: "Add one regulation per line.",
  },
  {
    key: "signage_permit_fees",
    label: "Signage Fees",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Small Building Signage (up to 5 sqm) | GHS 200 - 500\nMedium Building Signage (5-20 sqm) | GHS 500 - 1,500\nLarge Building Signage (above 20 sqm) | GHS 1,500 - 3,000\nBillboard/Hoarding | GHS 2,000 - 5,000\nDigital/LED Signage | GHS 1,000 - 3,000\nTemporary Signage (monthly) | GHS 100 - 300",
    description: "Use one fee row per line in the format: Category | Amount",
  },
  {
    key: "signage_permit_assistance_body",
    label: "Signage Assistance Body",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Development Planning Department\nFor signage permit applications\nPlanning Office\nMunicipal Assembly Headquarters",
    description: "Add one line per row.",
  },
  {
    key: "signage_permit_important_notes",
    label: "Signage Important Notes",
    type: "textarea",
    section: "signage-permit",
    defaultValue:
      "Do not install any signage without a valid permit\nPermits are non-transferable and valid for one year\nAnnual renewal of signage permits may be required\nUnauthorized signage will be removed at the owner's expense\nPermit holders are responsible for signage maintenance and safety\nChanges to approved signage design require written approval",
    description: "Add one note per line.",
  },
  {
    key: "units_intro",
    label: "Units & Committees Intro",
    type: "textarea",
    section: "units-committees",
    defaultValue:
      "The Ga South Municipal Assembly operates through various sub-committees that are responsible for specific areas of governance and development. These committees ensure effective deliberation and implementation of programmes across all sectors.",
  },
  {
    key: "units_committee_items",
    label: "Committee Items",
    type: "textarea",
    section: "units-committees",
    defaultValue:
      "Executive Committee | The Executive Committee is the highest decision-making body of the Assembly, responsible for overseeing the day-to-day administration and implementation of policies. | MCE (Chair), Presiding Member, 2/3 of Sub-Committee Chairs | Day-to-day administration of the Assembly; Implementation of Assembly decisions; Emergency decision making; Coordination of sub-committees\nDevelopment Planning Sub-Committee | Responsible for formulating and monitoring the implementation of development plans and projects within the municipality. | 10 Members including technical officers | Preparation of medium-term development plans; Monitoring of development projects; Spatial planning coordination; Environmental management oversight\nSocial Services Sub-Committee | Oversees social development programmes including education, health, water and sanitation, and community development. | 8 Members including sector heads | Education and health programmes oversight; Water and sanitation projects; Youth and sports development; Gender and social protection\nFinance & Administration Sub-Committee | Responsible for the financial management, revenue mobilization, and administrative matters of the Assembly. | 8 Members including finance officer | Budget preparation and monitoring; Revenue mobilization strategies; Human resource management; Asset management\nWorks Sub-Committee | Oversees infrastructure development, road construction, drainage systems, and maintenance of public buildings. | 8 Members including works engineer | Road construction and maintenance; Drainage and sanitation infrastructure; Public building maintenance; Contract monitoring\nJustice Sub-Committee | Handles matters relating to bye-laws, conflict resolution, and judicial functions of the Assembly. | 7 Members including legal officer | Bye-law formulation and enforcement; Conflict resolution and mediation; Public tribunal oversight; Legal affairs coordination",
    description:
      "Use one committee per line in the format: Name | Description | Members | responsibility 1; responsibility 2; responsibility 3",
  },
  {
    key: "units_special_units_title",
    label: "Special Units Title",
    type: "text",
    section: "units-committees",
    defaultValue: "Special Units",
  },
  {
    key: "units_special_unit_items",
    label: "Special Unit Items",
    type: "textarea",
    section: "units-committees",
    defaultValue:
      "Internal Audit Unit | Ensures compliance with financial regulations and procedures, and conducts regular audits of all departments.\nBudget Unit | Coordinates the preparation, implementation, and monitoring of the Assembly's annual budget.\nManagement Information System (MIS) | Manages information technology infrastructure and provides technical support to all departments.",
    description: "Use one unit per line in the format: Name | Description",
  },
];
