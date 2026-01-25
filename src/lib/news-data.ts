export interface NewsArticle {
  id: number;
  image: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  slug: string;
  content: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80",
    date: "March 6, 2024",
    category: "Events",
    title: "Ga South Municipal Assembly Marks 67th Independence Day Anniversary",
    excerpt: "The Ga South Municipal Assembly (GSMA) on Wednesday, March 6, 2024, held its 67th Independence Day celebration with a colorful parade and cultural display at the Weija Community Park.",
    slug: "independence-day-2024",
    content: `
The Ga South Municipal Assembly (GSMA) on Wednesday, March 6, 2024, held its 67th Independence Day celebration with a colorful parade and cultural display at the Weija Community Park.

The event, which brought together residents, traditional leaders, government officials, and students from various schools within the municipality, was marked by a grand parade showcasing Ghana's rich cultural heritage.

The Municipal Chief Executive (MCE), in his address, emphasized the importance of unity and collective effort in nation-building. He urged residents to embrace the spirit of patriotism and work together for the development of the municipality.

"As we celebrate 67 years of independence, let us reflect on the sacrifices of our forefathers and recommit ourselves to building a prosperous nation," the MCE stated.

The celebration featured performances from school children, traditional dance groups, and a march-past by various institutions within the municipality. Awards were also presented to outstanding individuals and organizations that have contributed significantly to the development of Ga South.

The event concluded with a durbar of chiefs and a cultural display that highlighted the diverse traditions of the people of Ga South Municipality.
    `.trim()
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    date: "February 15, 2024",
    category: "Infrastructure",
    title: "Inauguration Of Five Storey Office Complex For Ga South Municipal Assembly",
    excerpt: "The Ga South Municipal Assembly has officially inaugurated its ultra-modern five-storey office complex at Ngleshie Amanfro. The edifice will serve as the new headquarters of the Assembly.",
    slug: "office-complex-inauguration",
    content: `
The Ga South Municipal Assembly has officially inaugurated its ultra-modern five-storey office complex at Ngleshie Amanfro. The edifice will serve as the new headquarters of the Assembly, providing a conducive working environment for staff and improved service delivery to residents.

The inauguration ceremony was graced by the Regional Minister, Members of Parliament, traditional leaders, and other dignitaries. The project, which began three years ago, was funded through a combination of the District Assemblies Common Fund and Internally Generated Funds.

The new office complex features modern amenities including conference rooms, a public service hall, offices for all departments, and adequate parking space. The building is equipped with elevators, modern sanitation facilities, and backup power systems to ensure uninterrupted service delivery.

Speaking at the inauguration, the Regional Minister commended the Assembly for the achievement and urged other assemblies to emulate the example of Ga South in infrastructural development.

The Municipal Chief Executive expressed gratitude to the government and all stakeholders who contributed to the successful completion of the project. He assured residents that the Assembly would continue to work towards improving service delivery and infrastructure within the municipality.

The new headquarters is expected to significantly improve efficiency and coordination among the various departments of the Assembly.
    `.trim()
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    date: "November 10, 2023",
    category: "Community",
    title: "GSMA Organizes Town Hall Meeting On 2024 Fee Fixing Resolution",
    excerpt: "The Ga South Municipal Assembly (GSMA) has organized a Town Hall meeting to engage stakeholders on the proposed fee fixing resolution for the 2024 fiscal year.",
    slug: "town-hall-meeting-2024",
    content: `
The Ga South Municipal Assembly (GSMA) has organized a Town Hall meeting to engage stakeholders on the proposed fee fixing resolution for the 2024 fiscal year. The meeting, held at the Assembly Hall, brought together traditional leaders, business owners, market women, and representatives from various communities within the municipality.

The purpose of the meeting was to provide a platform for residents to contribute to the decision-making process regarding the fees and rates to be charged by the Assembly in the coming year. This participatory approach ensures transparency and inclusivity in local governance.

The Municipal Finance Officer presented the proposed fee structure, explaining the rationale behind various charges and how the revenue generated would be utilized for development projects within the municipality.

Participants raised concerns about certain fees and made suggestions for consideration. The Assembly assured attendees that all inputs would be carefully reviewed before finalizing the fee fixing resolution.

Key areas discussed included property rates, business operating permits, market tolls, and fees for various municipal services. The Assembly emphasized the importance of revenue generation for funding essential services and infrastructure projects.

The Town Hall meeting is part of the Assembly's commitment to participatory governance and ensuring that residents have a voice in decisions that affect their lives and livelihoods.
    `.trim()
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    date: "October 25, 2023",
    category: "Infrastructure",
    title: "Road Construction Project Commenced in Weija",
    excerpt: "The Assembly has commenced construction works on a major road project connecting Weija to Mallam junction. The project is expected to be completed within 18 months.",
    slug: "road-construction-weija",
    content: `
The Assembly has commenced construction works on a major road project connecting Weija to Mallam junction. The project is expected to be completed within 18 months and will significantly improve transportation within the municipality.

The 5.2-kilometer road project includes the construction of drains, pedestrian walkways, and streetlights. The contractor has mobilized equipment and personnel to site, and work is progressing steadily.

The Municipal Chief Executive, during a site inspection, expressed satisfaction with the progress of work and urged the contractor to adhere to specifications and timelines. He noted that the project would ease traffic congestion and improve access to various communities along the route.

Residents of the area have welcomed the project, expressing optimism that it would boost economic activities and improve their quality of life. The poor state of the road had previously caused difficulties for commuters and damage to vehicles.

The project is being funded through the Ghana Infrastructure Investment Fund and is part of the government's commitment to improving road infrastructure across the country.

The Assembly has called on residents to cooperate with the contractor and avoid activities that could impede the progress of work. Regular monitoring will be conducted to ensure quality and timely completion.
    `.trim()
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    date: "September 15, 2023",
    category: "Health",
    title: "Free Health Screening Exercise for Residents",
    excerpt: "The Municipal Health Directorate in collaboration with partner organizations organized a free health screening exercise for residents of Ga South Municipality.",
    slug: "health-screening-2023",
    content: `
The Municipal Health Directorate in collaboration with partner organizations organized a free health screening exercise for residents of Ga South Municipality. The three-day exercise, held at multiple locations across the municipality, provided access to essential health services for hundreds of residents.

Services provided included blood pressure checks, diabetes screening, eye examination, dental check-ups, and general health consultations. Participants also received health education on various topics including nutrition, exercise, and disease prevention.

The Municipal Health Director emphasized the importance of regular health check-ups in detecting and preventing diseases early. She encouraged residents to take advantage of such opportunities and prioritize their health.

Several residents who had not seen a doctor in years were able to receive medical attention and referrals for further treatment where necessary. The exercise also identified individuals with previously undiagnosed conditions who were immediately linked to care.

Partner organizations including local health facilities, NGOs, and pharmaceutical companies contributed resources and personnel to make the exercise successful. The Municipal Assembly provided logistical support and publicity.

The Assembly has announced plans to make such health screening exercises a regular occurrence to improve health outcomes in the municipality. Residents have been encouraged to also utilize the various health facilities within the municipality for their healthcare needs.
    `.trim()
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    date: "August 20, 2023",
    category: "Education",
    title: "Back to School Support for Vulnerable Students",
    excerpt: "The Ga South Municipal Assembly provided school supplies and uniforms to over 500 vulnerable students as part of its annual back-to-school support programme.",
    slug: "back-to-school-2023",
    content: `
The Ga South Municipal Assembly provided school supplies and uniforms to over 500 vulnerable students as part of its annual back-to-school support programme. The initiative aims to reduce barriers to education and ensure that all children within the municipality have the opportunity to learn.

Beneficiaries received school bags, books, mathematical sets, uniforms, and other essential supplies. The items were distributed at a ceremony attended by education officials, parents, and community leaders.

The Municipal Chief Executive, speaking at the event, reaffirmed the Assembly's commitment to education and urged parents to ensure their children attend school regularly. He noted that education is the foundation for development and called on all stakeholders to support the education of children.

The Municipal Education Director thanked the Assembly for the support and highlighted the positive impact such interventions have had on school enrollment and retention rates in the municipality. She called on other organizations to partner with the Assembly in supporting education.

Parents expressed gratitude for the support, noting that the cost of school supplies often poses a challenge for many families. They pledged to ensure their children make good use of the items and excel in their studies.

The Assembly has also invested in infrastructure development at various schools, including the construction of classroom blocks and provision of furniture. These efforts are part of a comprehensive approach to improving education outcomes in Ga South Municipality.
    `.trim()
  }
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(article => article.slug === slug);
}

export function getAllNewsSlugs(): string[] {
  return newsArticles.map(article => article.slug);
}
