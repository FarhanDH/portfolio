// ── Project DTO & 8-Section Engineering Case Study Metadata ───────────────────
export interface ProjectDeepDive {
  title: string;
  description: string;
}

export interface ProjectDTO {
  id: string;
  slug?: string;
  display_order?: number;
  title: string;
  role?: string;
  timeline?: string;
  description: string;
  long_description: string;
  image_url?: string | null;
  architecture_image_url?: string | null;
  tech: string[];
  github_url?: string | null;
  live_url?: string | null;
  featured?: boolean;

  // 02 · Project Overview (The Problem)
  problem?: string;
  // 03 · My Role & Responsibilities (What I Built)
  responsibilities?: string[];
  // 04 · System Architecture (Components, Communication & Data Flow)
  architecture?: string;
  architecture_flow?: string[];
  // 05 · Technical Implementation (Engineering Deep Dives)
  deep_dives?: ProjectDeepDive[];
  // 06 · Infrastructure & Operations (Deployment, Reliability, Security, Monitoring)
  operations?: string[];
  // 07 · Results & Evidence (What Did I Achieve?)
  results?: string[];
  // 08 · Lessons Learned (What Would I Improve?)
  lessons_learned?: string[];
}

export function toProjectSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const FALLBACK_PROJECTS: ProjectDTO[] = [
  {
    id: "d04de10f-eaff-4524-bef4-9dc126b0a093",
    slug: "sidingin",
    display_order: 10,
    title: "SiDingin",
    role: "Backend Developer",
    timeline: "Oct 2024 – Dec 2024",
    description:
      "API for booking Air Conditioner (AC) servicing, inspired by the Gojek application.",
    long_description:
      "SiDingin is an API that helps the process of booking Air Conditioner (AC) servicing. Inspired by the Gojek application, it provides role-based access control for Customer and Technician, order management with real-time status tracking, push notifications for order updates, and multiple payment method integration via Midtrans. Location-based technician matching is powered by OpenStreetMap API.",
    image_url: "/projects/sidingin-mockup.webp",
    architecture_image_url: "/projects/sidingin-infra.webp",
    tech: [
      "TypeScript",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Midtrans API",
      "OpenStreetMap API",
    ],
    github_url: "https://github.com/FarhanDH/cdingin",
    live_url: "https://pwa-cdingin.vercel.app",
    featured: true,
    problem:
      "Booking home AC maintenance traditionally relies on manual WhatsApp messages, opaque pricing, and uncertain technician arrival times. Customers struggle to find verified nearby technicians, while technicians lack a structured system to receive orders, track service status, and collect cashless payments reliably.",
    responsibilities: [
      "Designed and built the core RESTful backend service using NestJS, TypeScript, and TypeORM.",
      "Implemented Role-Based Access Control (RBAC) separating Customer booking permissions from Technician dispatch workflows.",
      "Integrated Midtrans Payment Gateway supporting QRIS, Virtual Accounts, and E-Wallets with webhook verification.",
      "Built location-based technician matching and distance calculation using the OpenStreetMap API.",
      "Configured real-time push notifications to alert customers and technicians on every order state change.",
    ],
    architecture:
      "The system follows a modular layered architecture in NestJS (Controller → Service → Repository) backed by a PostgreSQL relational database. Client requests pass through JWT authentication and role guards before executing business logic. Payment webhooks from Midtrans and geospatial lookups via OpenStreetMap are handled asynchronously with transactional guarantees.",
    architecture_flow: [
      "PWA Client",
      "NestJS API & JWT/RBAC Guards",
      "Order & Dispatch Service",
      "PostgreSQL (TypeORM)",
      "Midtrans & OpenStreetMap APIs",
    ],
    deep_dives: [
      {
        title: "Idempotent Midtrans Webhook Processing",
        description:
          "Payment gateways may send duplicate webhook notifications during network retries. I implemented cryptographic signature verification and database transactions in PostgreSQL so repeated webhooks never trigger duplicate order state transitions.",
      },
      {
        title: "Order Lifecycle State Machine",
        description:
          "Enforced strict state transitions (Pending → Confirmed → Technician Dispatched → In Progress → Completed / Cancelled) so neither customers nor technicians can mutate an order into an invalid state.",
      },
      {
        title: "Geospatial Technician Matching with OpenStreetMap",
        description:
          "Used OpenStreetMap geocoding and coordinate distance calculations to pair incoming service requests with available technicians within the customer's service radius.",
      },
    ],
    operations: [
      "Deployed backend services on cloud infrastructure with environment-isolated configuration and secrets management.",
      "Secured endpoints using JWT bearer authentication, bcrypt password hashing, and strict DTO payload validation (`class-validator`).",
      "Logged payment webhook payloads and order status transitions for auditability and fast debugging.",
    ],
    results: [
      "Delivered a working end-to-end on-demand AC booking platform live at pwa-cdingin.vercel.app.",
      "Supported multi-method digital payments (QRIS, Bank Transfer, E-Wallet) with zero duplicate transaction bugs during testing.",
      "Reduced booking-to-dispatch coordination to a few clicks with automated technician matching and push notifications.",
    ],
    lessons_learned: [
      "Adding a Redis caching layer for active technician coordinates would further reduce database reads during peak booking hours.",
      "Introducing WebSockets alongside push notifications would make live technician map tracking even smoother.",
    ],
  },
  {
    id: "dbca5e66-830c-463a-b0e4-94309b473a09",
    slug: "silani-api",
    display_order: 20,
    title: "Silani API",
    role: "Backend Developer",
    timeline: "2024 · Hackathon KMIPN VI",
    description:
      "API developed to help novice farmers manage their fields and get AI-powered farming advice.",
    long_description:
      'Silani is an API developed to help novice farmers in farming. It supports user authentication via Basic auth or Google OAuth, letting users create, update, and delete fields along with field size and plant details. Users can chat with "Lani," an AI assistant powered by Groq and Gemini, to get quick and accurate answers to farming questions. The API also sends notifications for harvest time, pesticide, and fertilizer reminders, with media stored on AWS S3. Built during the Hackathon KMIPN VI competition.',
    image_url: "/projects/silani-mockup.webp",
    architecture_image_url: "/projects/silani-infra.webp",
    tech: [
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "AWS S3 Bucket",
      "Groq AI",
      "Gemini AI",
    ],
    github_url: "https://github.com/FarhanDH/silani-back-end",
    featured: true,
    problem:
      "Novice farmers often struggle to track fertilization schedules, pest control timing, and optimal harvest windows across multiple parcels of land, and they rarely have immediate access to agronomy experts when crop issues appear.",
    responsibilities: [
      "Architected the Silani REST API in NestJS with Neon PostgreSQL deployed on Vercel Cloud during the national Hackathon KMIPN VI competition.",
      "Implemented dual authentication via Clerk Auth supporting both standard Basic credentials and Google OAuth 2.0.",
      "Built field and crop management CRUD modules tracking parcel area, plant varieties, and cultivation schedules.",
      'Integrated Groq AI and Google Gemini APIs to power "Lani," an interactive agronomy assistant.',
      "Configured AWS S3 Bucket storage for field imagery (Gambar Sawah) and built automated reminders for harvest, pesticide, and fertilizer schedules.",
    ],
    architecture:
      "The mobile application for novice farmers authenticates via Clerk Auth (Basic & Google OAuth) and communicates over HTTPS/REST with the Silani API hosted on Vercel Cloud. The API orchestrates three downstream systems: Neon PostgreSQL for relational data (fields, plants, schedules), AWS S3 Bucket for storing field imagery, and the Lani AI Assistant powered by Google Gemini AI and Groq AI.",
    architecture_flow: [
      "Mobile App (Novice Farmers)",
      "Clerk Auth (Basic & Google OAuth)",
      "Silani API (Vercel Cloud)",
      "Neon PostgreSQL & AWS S3 Bucket",
      "Lani AI (Google Gemini & Groq AI)",
    ],
    deep_dives: [
      {
        title: "Context-Aware AI Agronomy Prompting (Groq + Gemini)",
        description:
          "Instead of generic chatbot replies, the backend injects the farmer's active crop type, field size, and planting age into the system prompt before querying Groq and Gemini, producing actionable, crop-specific advice with low latency.",
      },
      {
        title: "Automated Cultivation & Harvest Scheduling",
        description:
          "Calculated fertilizer, pesticide, and harvest milestones based on planting dates and crop types, triggering timely notification reminders so farmers never miss critical cultivation stages.",
      },
    ],
    operations: [
      "Stored uploaded crop and field photos in an AWS S3 Bucket with strict MIME-type and file-size validation.",
      "Protected user routes with JWT guards and OAuth 2.0 callback verification.",
    ],
    results: [
      "Successfully delivered Agri-Tech backend platform for the Hackathon KMIPN VI competition.",
      "Enabled seamless cloud media uploads.",
    ],
    lessons_learned: [
      "Persisting conversation history vector embeddings in pgvector would allow Lani AI to recall long-term seasonal trends per field.",
      "Integrating external weather forecast APIs could dynamically adjust fertilizer and watering reminders before heavy rain.",
    ],
  },
  {
    id: "7ae47b8f-ccba-4a3b-91e2-49d9526e7f9f",
    slug: "chirp-api",
    display_order: 30,
    title: "Chirp API",
    role: "Backend Developer",
    timeline: "2024 · Collaborative Project",
    description:
      "Social media API inspired by X, built as a personal project with a friend.",
    long_description:
      "Chirp is a personal project built together with a friend, aiming to create a web application inspired by social media X. I contributed by building an API that provides user authentication, public post viewing for unauthenticated users, post creation with optional images for authenticated users, ownership-restricted post updates and deletes, post likes, and post comments.",
    image_url: "/projects/chirp-preview.svg",
    architecture_image_url: "/projects/chirp-arch.svg",
    tech: ["TypeScript", "NestJS", "PostgreSQL", "AWS S3 Bucket"],
    github_url: "https://github.com/manikandareas/chirp",
    featured: false,
    problem:
      "Building a modern social media feed requires balancing open public readability for unauthenticated guests with strict authentication, resource ownership enforcement, and scalable media handling for authenticated creators.",
    responsibilities: [
      "Developed the backend REST API using NestJS and PostgreSQL in collaboration with a frontend partner.",
      "Implemented JWT authentication alongside public read endpoints for unauthenticated timeline browsing.",
      "Built post creation endpoints supporting multipart image uploads stored on AWS S3.",
      "Created ownership authorization guards restricting post edits and deletions exclusively to the post author.",
      "Implemented relational post likes and comment threads.",
    ],
    architecture:
      "Chirp is structured as a RESTful NestJS backend backed by PostgreSQL and AWS S3. Read requests for the public timeline bypass auth guards for fast guest access, while write mutations (create post, upload image, like, comment, edit, delete) pass through JWT authentication and ownership verification middleware.",
    architecture_flow: [
      "Web Client",
      "Chirp API (NestJS + TypeScript)",
      "Post / Like / Comment Services",
      "PostgreSQL & AWS S3",
    ],
    deep_dives: [
      {
        title: "Fine-Grained Ownership Guards",
        description:
          "Designed custom authorization checks that compare the authenticated user ID from the JWT token against the post's `author_id` in PostgreSQL before allowing `PATCH` or `DELETE` operations.",
      },
      {
        title: "Multipart Image Streaming to AWS S3",
        description:
          "Handled optional image attachments on post creation by validating file buffers and uploading them directly to an AWS S3 bucket, storing only the CDN/S3 object URL in PostgreSQL.",
      },
    ],
    operations: [
      "Enforced DTO request validation and sanitized user-generated post and comment content.",
      "Configured relational foreign keys and cascade rules in PostgreSQL so deleting a post cleanly removes orphaned likes, comments, and S3 references.",
    ],
    results: [
      "Delivered a clean, responsive social media API supporting guest feeds, authenticated media posts, likes, and comments.",
      "Collaborated smoothly with the frontend developer using clear API contracts and consistent JSON response shapes.",
    ],
    lessons_learned: [
      "Implementing cursor-based pagination instead of offset pagination would improve feed performance as post volume grows.",
      "Adding rate limiting on like and comment endpoints would further harden the API against spam.",
    ],
  },
  {
    id: "0fcedf86-6b8d-47e1-b130-9a4045e83d03",
    slug: "say-kost-app",
    display_order: 40,
    title: "Say-Kost App",
    role: "Backend Developer",
    timeline: "2023 · Final Course Project",
    description:
      "Desktop application for managing boarding houses, built as a final project for Interactive Multimedia Programming.",
    long_description:
      "Say-Kost App is a desktop application created to manage boarding houses for admins, while allowing customers to make reservations. It features role-based user authentication for Admin and Customer roles. Admins can manage boarding house data and view all customer transactions, while customers can browse available boarding houses, make reservations, and view their own transaction history. This was the final project for the Interactive Multimedia Programming course at Politeknik Negeri Samarinda.",
    image_url: "/projects/say-kost-preview.webp",
    architecture_image_url: "/projects/say-kost-arch.svg",
    tech: ["Java", "Netbeans", "MySQL", "express.js"],
    github_url: "https://github.com/Abizar14/saykost-java",
    featured: false,
    problem:
      "Small boarding house (kost) owners frequently track room availability and tenant payments on paper ledgers, making it difficult for prospective tenants to check available rooms or review their booking history.",
    responsibilities: [
      "Co-developed the unified desktop GUI and backend business logic in Java (NetBeans) within a single repository connected to MySQL via JDBC.",
      "Used Express.js with Drizzle ORM as a one-time initialization tool to automate database schema migrations.",
      "Implemented role-based login flows separating Admin property management from Customer reservation views.",
      "Built Admin modules to create, update, and manage boarding house room inventory and inspect all customer transactions.",
      "Built Customer workflows to browse available rooms, submit reservations, and view personal transaction history.",
    ],
    architecture:
      "Both the desktop GUI and the backend booking/management logic are unified inside a single Java (Swing/NetBeans) application repository that communicates directly with a MySQL relational database via JDBC. Express.js with Drizzle ORM is run once during project initialization solely to execute database schema migrations.",
    architecture_flow: [
      "Java NetBeans GUI",
      "Role-Based Auth (Admin & Customer)",
      "Java Backend (Booking & Admin Logic)",
      "MySQL Relational Database (JDBC)",
    ],
    deep_dives: [
      {
        title: "Synchronizing Room Availability on Booking",
        description:
          "Ensured that when a customer completes a room reservation, the room status in MySQL immediately updates to occupied so no two customers can reserve the same unit simultaneously.",
      },
      {
        title: "Role-Separated Desktop Views",
        description:
          "Structured distinct UI panels and data queries for Admins (full transaction ledger and room CRUD) versus Customers (available room catalog and personal booking history).",
      },
    ],
    operations: [
      "Validated booking inputs and credentials before executing SQL queries in MySQL.",
      "Structured relational tables for users, boarding house rooms, and reservation transactions.",
    ],
    results: [
      "Completed and presented as the capstone final project for the Interactive Multimedia Programming course at Politeknik Negeri Samarinda.",
      "Automated boarding house room inventory tracking, reservation creation, and transaction history lookup.",
    ],
    lessons_learned: [
      "Migrating the desktop client to a responsive web application with automated online payment gateway confirmation would make tenant onboarding even easier.",
    ],
  },
];

/**
 * Merges incoming API project data with local rich 8-section metadata
 * so both API and fallback projects render all 8 sections cleanly.
 */
export function enrichProject(project: ProjectDTO): ProjectDTO {
  const slug = project.slug || toProjectSlug(project.title);
  const match = FALLBACK_PROJECTS.find(
    (p) =>
      p.id === project.id || p.slug === slug || toProjectSlug(p.title) === slug,
  );

  return {
    ...match,
    ...project,
    slug,
    image_url:
      project.image_url || match?.image_url || "/projects/sidingin-preview.svg",
    architecture_image_url:
      project.architecture_image_url ||
      match?.architecture_image_url ||
      "/projects/sidingin-arch.svg",
    role: project.role || match?.role || "Backend Developer",
    timeline: project.timeline || match?.timeline || "2024",
    problem:
      project.problem ||
      match?.problem ||
      project.long_description ||
      project.description,
    responsibilities:
      project.responsibilities && project.responsibilities.length > 0
        ? project.responsibilities
        : match?.responsibilities || [
            "Designed and implemented the backend API architecture and database schema.",
            "Built authentication, authorization, and core business logic endpoints.",
            "Integrated third-party services and ensured reliable data persistence.",
          ],
    architecture:
      project.architecture ||
      match?.architecture ||
      `Built using ${project.tech.join(", ")} following a clean modular architecture with structured validation and relational persistence.`,
    architecture_flow:
      project.architecture_flow && project.architecture_flow.length > 0
        ? project.architecture_flow
        : match?.architecture_flow || [
            "Client",
            "REST API Layer",
            "Service & Business Logic",
            "Database & External Services",
          ],
    deep_dives:
      project.deep_dives && project.deep_dives.length > 0
        ? project.deep_dives
        : match?.deep_dives || [
            {
              title: "Modular Service Design & Data Integrity",
              description:
                "Separated routing, business rules, and data access layers while enforcing strict payload validation and transactional consistency.",
            },
          ],
    operations:
      project.operations && project.operations.length > 0
        ? project.operations
        : match?.operations || [
            "Environment-based configuration and secret management.",
            "Authentication guards and input validation on all write endpoints.",
            "Structured error handling and request logging for troubleshooting.",
          ],
    results:
      project.results && project.results.length > 0
        ? project.results
        : match?.results || [
            `Delivered a production-ready system powered by ${project.tech.join(", ")}.`,
          ],
    lessons_learned:
      project.lessons_learned && project.lessons_learned.length > 0
        ? project.lessons_learned
        : match?.lessons_learned || [
            "Expanding automated integration test coverage and caching hot read paths would further improve scalability.",
          ],
  };
}

export async function fetchProjectsData(): Promise<ProjectDTO[]> {
  const apiBase = import.meta.env.VITE_API_BASE_URL as string;
  const endpoint = apiBase ? `${apiBase}/api/v1/projects` : "";

  if (!endpoint) {
    return FALLBACK_PROJECTS.map(enrichProject);
  }

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ProjectDTO[];
    const sorted = [...data].sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
    );
    const list = sorted.length > 0 ? sorted : FALLBACK_PROJECTS;
    return list.map(enrichProject);
  } catch {
    return FALLBACK_PROJECTS.map(enrichProject);
  }
}
