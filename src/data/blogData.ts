export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  caseStudy: {
    problem: string;
    decision: string;
    implementation: string;
    outcome: string;
  };
}

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: "bullmq-redis-latency",
    title:
      "Reducing API Latency with Distributed Background Queues (BullMQ & Redis)",
    date: "May 2026",
    readTime: "4 min read",
    summary:
      "How offloading heavy synchronous tasks to Redis-backed worker queues kept our NestJS REST endpoints fast and reliable under load.",
    tags: ["NestJS", "BullMQ", "Redis"],
    caseStudy: {
      problem:
        "Synchronous API requests that triggered notifications, third-party calls, or heavy data processing caused slow response times and occasional timeouts during peak traffic.",
      decision:
        "Chose BullMQ on top of Redis over in-memory queues so jobs persist across container restarts, support automatic exponential backoff retries, and scale horizontally across workers.",
      implementation:
        "Decoupled the HTTP controller from heavy processing: the NestJS endpoint validates the payload, enqueues a typed job to Redis, and immediately returns a 202/200 status while dedicated worker consumers process the queue.",
      outcome:
        "Reduced average task endpoint latency and eliminated dropped tasks during service deployments.",
    },
  },
  {
    id: "sidingin-midtrans-architecture",
    title: "Designing Reliable Payment & Real-Time Order Workflows in SiDingin",
    date: "Dec 2024",
    readTime: "5 min read",
    summary:
      "Structuring role-based order state machines, Midtrans webhook verification, and location matching for an on-demand AC service platform.",
    tags: ["System Design", "Midtrans", "PostgreSQL"],
    caseStudy: {
      problem:
        "On-demand service bookings require strict state transitions between Customers and Technicians, plus idempotent payment handling when webhooks arrive more than once.",
      decision:
        "Used PostgreSQL transactions with TypeORM and strict webhook signature verification from Midtrans before mutating order states.",
      implementation:
        "Built a state-driven order module in NestJS paired with OpenStreetMap geospatial matching and Google Cloud Platform deployment during the Bangkit Capstone project.",
      outcome:
        "Delivered a reliable end-to-end booking and payment flow supporting multiple payment methods without duplicate order mutations.",
    },
  },
  {
    id: "golang-portfolio-api",
    title: "Why I Built a Golang REST API to Power My Portfolio Data",
    date: "Sep 2026",
    readTime: "3 min read",
    summary:
      "Moving projects, certifications, and inbox data out of hardcoded frontend arrays into a fast, structured Go backend service.",
    tags: ["Golang", "REST API", "Architecture"],
    caseStudy: {
      problem:
        "Updating portfolio projects or certifications in a static frontend required code edits and full frontend rebuilds every time.",
      decision:
        "Built a lightweight Golang HTTP API (/api/v1/projects, /api/v1/certifications) with clean layered architecture (handler -> service -> repository) and paired it with client-side snapshot fallbacks.",
      implementation:
        "Implemented context-aware SQL queries in Go and connected the React TypeScript frontend via environment-configured endpoints.",
      outcome:
        "Sub-millisecond API responses, zero-downtime content updates, and resilient frontend rendering even if the backend is offline.",
    },
  },
];
