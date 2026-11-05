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
      "Designed and maintained RESTful APIs serving 10k+ daily requests using NestJS and PostgreSQL.",
      "Implemented a distributed background job system with BullMQ and Redis, reducing task latency.",
      "Containerized services with Docker and set up CI/CD pipelines on Jenkins for automated deployment.",
      "Collaborated with the frontend team to define API contracts and Swagger documentation standards.",
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
    location: "South Jakarta, Indonesia",
    highlights: [
      "Built user authentication and role-based access control modules using NestJS and TypeORM.",
      "Integrated Midtrans Payment Gateway to process digital transactions reliably.",
      "Provisioned and deployed the backend infrastructure utilizing Google Cloud Platform (GCP) services to ensure high availability.",
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
