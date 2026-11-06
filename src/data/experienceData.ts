export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string | null;
  location: string;
  highlights: string[];
  tech: string[];
}

export const FALLBACK_EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    role: "Backend Developer Intern",
    company: "PT. Media Kreasi Abadi",
    type: "Internship",
    startDate: "Jan 2026",
    endDate: "May 2026",
    location: "Balikpapan, Indonesia · Remote",
    highlights: [
      "Participated in revamping a system to a modern NestJS and Prisma ORM architecture, delivering 50+ RESTful API endpoints.",
      "Containerized the application using Docker and established an automated CI/CD pipeline via Jenkins.",
      "Collaborated with Mobile and Frontend teams, providing comprehensive API documentation.",
      "Integrated asynchronous LLM features for project reviews using BullMQ and Redis.",
    ],
    tech: [
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
      "Jenkins",
    ],
  },
  {
    id: 2,
    role: "Backend Developer (Bangkit Capstone)",
    company: "Nusantara Beta Studio",
    type: "Apprenticeship",
    startDate: "Oct 2024",
    endDate: "Dec 2024",
    location: "South Jakarta, Indonesia · Remote",
    highlights: [
      "Developed RESTful APIs for a restaurant POS system using NestJS, TypeORM, and PostgreSQL, covering menu management, orders, users, and transactions.",
      "Implemented Role-Based Access Control (RBAC) authentication and authorization to manage access permissions between Cashier and Admin roles.",
      "Integrated the Midtrans Payment Gateway to support digital payment transaction processing.",
      "Set up and deployed the backend infrastructure on Google Cloud Platform (GCP), using Google App Engine, Cloud SQL, and Google Cloud Storage to support development agility and application availability.",
    ],
    tech: [
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Midtrans",
      "Google Cloud Platform",
    ],
  },
  {
    id: 3,
    role: "Junior Network Engineer",
    company: "PT. Lintasmaya Multi Media",
    type: "Internship",
    startDate: "Oct 2021",
    endDate: "Dec 2021",
    location: "Samarinda, Indonesia",
    highlights: [
      "Assembled Ubiquiti Rocket Dish 30 and 40 for long-range wireless network connectivity.",
      "Conducted intensive connection testing and diagnostics to ensure network reliability.",
      "Performed fiber optic splicing for high-speed data transmission.",
      "Configured WLAN, captive login pages, and PPPoE Server & Client on MikroTik routers.",
    ],
    tech: ["MikroTik", "Fiber Optics", "PPPoE", "Network Engineering"],
  },
];
